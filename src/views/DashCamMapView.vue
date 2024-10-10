<script setup lang="ts">
import type { FilterItem } from '@/components/molecules/FilterSection.vue';
import { city } from '@/zipcode/city'
import BaseInput from '@/components/atoms/BaseInput.vue'
import { onMounted, ref, computed, watch } from 'vue';
import MessageModal from '@/components/molecules/MessageModal.vue';
import { useGoogleMapsStore } from '@/stores/googleMaps';
import FilterSection from '@/components/molecules/FilterSection.vue';
import type { Accident, Spot, Video } from '@/components/molecules/HelpDataRow.vue';
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer';
import videoDotIconUrl from '/public/images/video-marker.svg'
import accidentDotIconUrl from '/public/images/accident-marker.svg'
import { RouterLink, useRoute, useRouter } from 'vue-router';

const googleMapsStore = useGoogleMapsStore();

const router = useRouter(); 
// 跳轉至列表
const goToExpand = () => {
    router.push({ name: 'expand' });
};
const goToDetails = (id: string, showButton: boolean) => {
  router.push({ 
    name: 'DetailsPage', 
    params: { id },  // 傳遞 id
    query: { showButton: showButton ? 'true' : 'false' }  // 傳遞 showButton 參數
  });
};
export interface SearchData {
    keyword: string,
}
const selectedSearchData = ref<SearchData>({
    keyword: '',
});

const spotList = ref<Spot[]>([])
/** 搜尋結果 */
const searchSpotList = ref<Spot[]>([]);
/** 視窗下搜尋結果 */
const filteredSpotList = ref<Spot[]>([]);
const selectedSpot = ref<Spot | null>(null);

/** 是否展開找地點面板 */
const isExpand = ref(false);
/** 是否點選展開列表 */
const isExpandList = ref(false);
/** 是否點選展開明細 */
const isExpandDetail = ref(false);

let isMapReady = ref(false);

let map: any = null;

/** 使用者定位 */
let marker: any = null;
let markers: google.maps.Marker[] = [];
let markerCluster: any = null;
/**
 * 目前位置
 */
const currentLocation = ref<{ lat: number; lng: number; results: any[] }>({
    // 預設經緯度在信義區附近
    lat: 25.0325917,
    lng: 121.5624999,
    results: []
});

/**
 * 是否顯示未開啟取用位置權限通知
 */
let isShowGeoError = ref(false);

onMounted(async () => {
    initMap(currentLocation.value.lat, currentLocation.value.lng);
    selectedSearchData.value = {keyword: "車禍影片與協尋"};
    try {
        const response = await fetch("/mock/help.json");
        if (response.ok) {
            const data = await response.json();
            (data.data as Accident[]).forEach(item => spotList.value.push({
                id: item.id,
                date: item.summary.date,
                coord: { lat: item.coordinates.latitude, lng: item.coordinates.longitude },
                detail: item
            }));
        } else {
            console.error("Failed to fetch data");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    try {
        const response = await fetch("/mock/video.json");
        if (response.ok) {
            const data = await response.json();
            (data.data as Video[]).forEach(item => spotList.value.push({
                id: item.id,
                date: item.summary.date,
                coord: { lat: item.coordinates.latitude, lng: item.coordinates.longitude },
                detail: item
            }));
        } else {
            console.error("Failed to fetch data");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    searchSpotList.value = spotList.value;
});

const setMapHeight = () => {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.style.height = `${window.innerHeight - 132}px`;
    }
};

const handleExpandChange = (newValue: boolean) => {
    isExpand.value = newValue;
};

const handleSearchChange = async (data: SearchData) => {
    if (!data) {
        return;
    }
    console.log('handleSearchChange:', data);
    searchSpotList.value = spotList.value;
    selectedSearchData.value = data;

    searchSpotList.value =
        searchSpotList.value.filter((item) => item.detail.title.includes(selectedSearchData.value.keyword));
    // if (selectedIcons.value)
    //     searchSpotList.value = searchSpotList.value.filter((item) => (!("協尋" in selectedIcons.value) && !('bluetooth' in item.detail)) && (!('影片' in selectedIcons.value) && ('bluetooth' in item.detail)))
    if (selectedIcons.value)
        searchSpotList.value = searchSpotList.value.filter((item) => (selectedIcons.value.includes('協尋') && selectedIcons.value.includes('影片')) || (selectedIcons.value.includes('協尋') ? 'bluetooth' in item.detail : !('bluetooth' in item.detail)))

    console.log(searchSpotList.value)
    if (selectedDistricts.value)
        searchSpotList.value = searchSpotList.value.filter((item) => selectedDistricts.value.includes(item.detail.summary.area))
    console.log('searchSpotList:', searchSpotList.value);
};

const initMap = (lat: number, lng: number) => {
    googleMapsStore.loader.load().then(async () => {
        const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;

        map = new Map(document.getElementById('map') as HTMLElement, {
            // 設定地圖的中心點經緯度位置
            center: { lat, lng },
            // 設定地圖縮放比例 0-20
            zoom: 13,
            // 限制使用者能縮放地圖的最大比例
            maxZoom: 20,
            // 限制使用者能縮放地圖的最小比例
            minZoom: 3,
            // 設定是否呈現右下角街景小人
            streetViewControl: false,
            // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
            // 替換成您的 MAP ID
            mapId: ''
        });

        // init marker
        marker = new google.maps.Marker({
            position: {
                lat,
                lng
            },
            map,
            title: 'your location',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#4285F4',
                fillOpacity: 1,
                scale: 8, // 控制大小
                strokeColor: 'white',
                strokeWeight: 2
            }
        });

        // get current location
        getPositionClick();

        // 在地圖的dragend事件上使用該函數
        map.addListener('dragend', function () {
            updateMarkers();
        });

        // // 在地圖的zoom_changed事件上使用該函數
        map.addListener('zoom_changed', function () {
            updateMarkers();
        });

        isMapReady.value = true;
        setMapHeight();
        window.addEventListener('resize', setMapHeight);
    });
};
const getPositionClick = () => {
    googleMapsStore
        .gettingPosition()!!
        .then((position: any) => successCallback(position))
        .catch((error) => errorCallback(error));
};

const successCallback = (position: GeolocationPosition) => {
    currentLocation.value.lat = position.coords.latitude;
    currentLocation.value.lng = position.coords.longitude;

    // 使用者目前位置
    marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    map.setCenter(marker.getPosition()!);
};
const errorCallback = (error: any) => {
    console.log(error);
    if (error.code === 1) {
        // 使用者未開啟定位
        isShowGeoError.value = true;
    }
};

const updateMarkers = async () => {
    // if (!selectedSearchData.value.keyword) {
    //     clearMarkers();
    //     return;
    // }

    const bounds = map.getBounds();
    if (!bounds) return;

    filteredSpotList.value = searchSpotList.value
        .map((spot) => ({
            ...spot,
            position: new google.maps.LatLng(spot.coord.lat, spot.coord.lng)
        }))
        .filter((spot) => bounds.contains(spot.position))
        .map((spot) => ({
            ...spot,
            distance: parseFloat(
                (
                    google.maps.geometry.spherical.computeDistanceBetween(
                        new google.maps.LatLng(currentLocation.value.lat, currentLocation.value.lng),
                        new google.maps.LatLng(spot.coord.lat, spot.coord.lng)
                    ) / 1000
                ).toFixed(1)
            )
        }));

    console.log('filteredSpotList:', filteredSpotList.value);

    // Clear existing markers
    clearMarkers();

    let currentFocusedMarker: any = null;

    filteredSpotList.value.forEach((spot) => {
        const greenDotIcon = {
            url: 'bluetooth' in spot.detail ? accidentDotIconUrl : videoDotIconUrl, // 預設綠色小圓點圖標的路徑
            scaledSize: new google.maps.Size(60, 60), // 設置圖標的大小
            anchor: new google.maps.Point(10, 20) // 設置圖標的錨點，使其中心對齊底部
        };

        const marker = new google.maps.Marker({
            position: { lat: Number(spot.coord.lat), lng: Number(spot.coord.lng) },
            map,
            icon: greenDotIcon
        });

        marker.addListener('click', () => {
            if (currentFocusedMarker && currentFocusedMarker !== marker) {
                // 恢復之前聚焦的標記為預設圖標
                currentFocusedMarker.setIcon(greenDotIcon);
                selectedSpot.value = null;
            }

            goToDetails(spot.id, false)

            // const focusedIcon = {
            //     url: 'bluetooth' in spot.detail ? accidentDotIconUrl : videoDotIconUrl, // 點擊後聚焦圖標的路徑
            //     scaledSize: new google.maps.Size(70, 70), // 設置圖標的大小
            //     anchor: new google.maps.Point(10, 20) // 設置圖標的錨點，使其中心對齊底部
            // };

            // // 設置當前標記為聚焦圖標
            // marker.setIcon(focusedIcon);
            // currentFocusedMarker = marker;

            // // 獲取所選擇的 spot 的所有屬性
            // selectedSpot.value = spot;
            // console.log('Selected spot:', selectedSpot);
        });

        markers.push(marker);
    });
    // Add a marker clusterer to manage the markers.
    markerCluster = new MarkerClusterer({
        markers,
        map,
        algorithm: new SuperClusterAlgorithm({ radius: 300 }), // 设置gridSize
        renderer: {
            render({ count, position }, stats) {
                // change color if this cluster has more markers than the mean cluster
                const circleRadius =
                    count > Math.max(10, stats.clusters.markers.mean)
                        ? count > Math.max(100, stats.clusters.markers.mean)
                            ? '100'
                            : '90'
                        : '80';
                // create svg literal with fill color
                const svg =
                    window.btoa(`<svg fill="#2eb6c7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
          <circle fill="#2eb6c7" cx="120" cy="120" opacity=".6" r="${circleRadius}" />
          <circle fill="#fff" cx="120" cy="120" r="70" />
          <text x="50%" y="50%" style="fill:#2eb6c7" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${count}</text>
          </svg>`);

                // create marker using svg icon
                return new google.maps.Marker({
                    position,
                    icon: {
                        url: `data:image/svg+xml;base64,${svg}`,
                        scaledSize: new google.maps.Size(75, 75)
                    },
                    // adjust zIndex to be above other markers
                    zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count
                });
            }
        }
    });
};
const clearMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
    if (markerCluster) {
        markerCluster.clearMarkers();
    }
    selectedSpot.value = null;
};

// Watch for changes in searchSpotList
watch(searchSpotList, updateMarkers);
const searchValue = ref('');

watch([isExpand, searchValue], ([newExpandValue, newSearchValue]) => {
    handleExpandChange(newExpandValue)
    handleSearchChange({ keyword: newSearchValue })
});

const selectedDistricts = ref<string[]>([])
const selectedIcons = ref<string[]>([])
const filterToggle = ref(false)

const applyFilters = (filters: { [key: string]: string[] }) => {
    selectedDistricts.value = filters["地區"]
    selectedIcons.value = filters["圖標類型"]
    handleSearchChange({ keyword: searchValue.value })
}
const areas = computed(() =>
    city.filter((item) => item.county === "臺北市").map((item) => item.city).reduce((acc, key) => {
        acc[key] = false;
        return acc;
    }, {} as { [key: string]: boolean })
);

const filterData = ref([{
    name: "圖標類型",
    data: {
        "協尋": false,
        "影片": false,
    }
}, {
    name: "地區",
    data: areas
},] as FilterItem[])

</script>

<template>
    <div class="pb-8 h-screen">
        <div :class="{ hidden: isExpandList || isExpandDetail, visible: !isExpandList && !isExpandDetail }">
            <!-- 找地點搜尋框 -->
            <div class="py-4">
                <div class="flex items-center pl-3">
                    <BaseInput v-model="searchValue" placeholder="輸入事故關鍵字" class="flex-grow" />
                    <button class="filter-button" @click="filterToggle = !filterToggle">
                        <img src="@/assets/images/filter.svg" alt="篩選器" />
                    </button>
                </div>
                <div class="flex flex-row items-center p-3 gap-4">
                    <RouterLink to="upload"
                        class="h-8 w-1/2 px-0.5 flex flex-row gap-1 items-center justify-center border border-primary-500 rounded-md text-primary-500 ">
                        <img src="@/assets/images/upload-2.svg" alt="上傳影像" />
                        我看到事故
                    </RouterLink>
                    <RouterLink to="report"
                        class="h-8 w-1/2 px-0.5 flex flex-row gap-1 items-center justify-center border rounded-md border-warn-200 text-warn-200">
                        <img src="@/assets/images/warning-2.svg" alt="通報事故" />
                        我發生事故
                    </RouterLink>
                </div>
            </div>
            <!-- 地圖 -->
            <div class="relative flex-1" :class="{ hidden: isExpand, visible: !isExpand }">
                <div class="google-map" id="map"></div>
                <div v-if="isMapReady" class="gps">
                    <img src="@/assets/images/gps.png" width="20" alt="" />
                </div>
            </div>
            <!-- 底部搜尋結果 -->
            <div class="floating-box bottom-0 w-full">
                <div class="flex items-center">
                    <span class="font-bold mr-2">{{ selectedSearchData.keyword }}</span>
                    <div class="text-primary-500 border border-primary-500 rounded-full px-2">
                        {{ filteredSpotList.length }}筆結果
                    </div>
                </div>
                <a class="text-primary-500" @click="goToExpand">展開列表</a>
            </div>
        </div>
        <FilterSection :model-value="filterToggle" :values="filterData" @apply="applyFilters"
            @close="filterToggle = false" />
    </div>

    <MessageModal :is-show="isShowGeoError">
        <template #header>
            <p>請啟用定位服務</p>
        </template>
        <template #body>
            <p class="text-grey-700">打開定位服務來允許“台北通”確認您的位置</p>
        </template>
        <template #footer>
            <button class="text-primary-500 px-7 py-2 w-full" @click="isShowGeoError = false">
                確認
            </button>
        </template>
    </MessageModal>
</template>

<style lang="postcss" scoped>
.google-map {
    width: 100%;
    height: 400px;
}

.marker {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
}

.gps {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: rgb(255, 255, 255);
    width: 40px;
    height: 40px;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.floating-box {
    @apply absolute flex items-center justify-between bg-white px-4 py-6 rounded-xl;
    box-shadow: rgba(0, 0, 0, 0.04) 0px -4px 10px;
}

.filter-button {
    @apply bg-primary-500 mx-2 p-1 rounded-lg;
    @apply h-10 w-10;
    @apply flex justify-center items-center;
    @apply -translate-x-1;
}
</style>
