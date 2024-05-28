// display variables
var displayMap;
let view;
let worldC;
let pointsLables;

// let eventsData = [
//   {
//     countryName: "United States of America",
    // attendedLiveEvent: "51%",
    // liveEventsAttended: 5.3,
//   },
//   {
//     countryName: "San Marino",
//     attendedLiveEvent: "51%",
//     liveEventsAttended: 5.3,
//   },
//   {
//     countryName: "Egypt",
//     attendedLiveEvent: "51%",
//     liveEventsAttended: 5.3,
//   },
//   {
//     countryName: "France",
//     attendedLiveEvent: "51%",
//     liveEventsAttended: 5.3,
//   },
//   {
//     countryName: "Georgia",
//     attendedLiveEvent: "51%",
//     liveEventsAttended: 5.3,
//   }
// ]

function loadModule(moduleName) {
  return new Promise((resolve, reject) => {
    require([moduleName], (module) => {
      if (module) {
        resolve(module);
      } else {
        reject(new Error(`Module not found: ${moduleName}`));
      }
    }, (error) => {
      reject(error);
    });
  });
}

async function initializeDynamicImage() {
  try {
    const [esriConfig, Map, MapView, FeatureLayer, GeoJSONLayer] =
      await Promise.all([
        loadModule("esri/config"),
        loadModule("esri/Map"),
        loadModule("esri/views/MapView"),
        loadModule("esri/layers/FeatureLayer"),
        loadModule("esri/layers/GeoJSONLayer"),
      ]);

    esriConfig.apiKey =
      "AAPKabb4ac113be142e7adef32d7fd2de45aY6aflWLbwtR92ugWYzDFyFwkUhMcUnO3NfDw2xWbV5BuGoHs3-AYvj4iCGTB7fEQ"; // Will change it

    var COName = {
      labelExpressionInfo: {
        expression: `$feature.Name`
      },
      labelPlacement: "above-center",
      symbol: {
        type: "text", // autocasts as new TextSymbol()
        font: {
          size: 16,
          weight: "bold"
        },
        // xoffset: 3,
        yoffset: 3,
        horizontalAlignment: "center",
        color: "black",
        haloColor: "black",
        // haloSize: 1
      },
      // where: "OBJECTID_1 = '1'"
    }

    var attendedLiveEventCO = {
      labelExpressionInfo: {
        expression: `$feature.attendedLiveEvent`
      },
      labelPlacement: "center-left",
      symbol: {
        type: "text", // autocasts as new TextSymbol()
        font: {
          size: 24,
          weight: "bold"
        },
        horizontalAlignment: "center",
        color: "white",
        haloColor: "#4792c1",
        haloSize: 1
      },
      // where: "OBJECTID_1 = '1'"
    }

    var attendedLiveEventCO0 = {
      labelExpressionInfo: {
        expression: `"attended a live event"`
      },
      labelPlacement: "below-left",
      symbol: {
        type: "text", // autocasts as new TextSymbol()
        font: {
          family: "Noto Sans",
          size: 8,
          // weight: "bold"
        },
        xoffset: -5,
        color: "black",
        horizontalAlignment: "center",
        verticalAlignment: "middle",
        lineWidth: 49
        // haloColor: "#4792c1",
        // haloSize: 1
      }
    }

    var liveEventsAttendedCO = {
      labelExpressionInfo: {
        expression: `$feature.liveEventsAttended`
      },
      labelPlacement: "center-right",
      symbol: {
        type: "text", // autocasts as new TextSymbol()
        font: {
          size: 24,
          weight: "bold"
        },
        horizontalAlignment: "center",
        color: "white",
        haloColor: "#4792c1",
        haloSize: 1
      }
    }

    var liveEventsAttendedCO0 = {
      labelExpressionInfo: {
        expression: `"live events attended"`
      },
      labelPlacement: "below-right",
      symbol: {
        type: "text", // autocasts as new TextSymbol()
        font: {
          family: "Noto Sans",
          size: 8,
          // weight: "bold"
        },
        color: "black",
        horizontalAlignment: "center",
        verticalAlignment: "middle",
        lineWidth: "72px"
        // haloColor: "#4792c1",
        // haloSize: 1
      }
    }

    var infoLeftCO = {
      labelExpressionInfo: {
        expression: `$feature.attendedLiveEvent + " " + "in" + " " + $feature.Attribute_Year`
      },
      labelPlacement: "below-left",
      symbol: {
        type: "text", // autocasts as new TextSymbol()
        font: {
          family: "Noto Sans",
          size: 10,
          // weight: "bold"
        },
        xoffset: 4,
        yoffset: -30,
        color: "black",
        horizontalAlignment: "center",
        verticalAlignment: "middle",
        lineWidth: "72px",
        color: "#006699",
        // haloColor: "#4792c1",
        // haloSize: 1
      }
    }

    var infoRightCO = {
      labelExpressionInfo: {
        expression: `$feature.attendedLiveEvent + " " + "in" + " " + $feature.Attribute_Year`
      },
      labelPlacement: "below-right",
      symbol: {
        type: "text", // autocasts as new TextSymbol()
        font: {
          family: "Noto Sans",
          size: 10,
          // weight: "bold"
        },
        xoffset: -4,
        yoffset: -30,
        color: "black",
        horizontalAlignment: "center",
        verticalAlignment: "middle",
        lineWidth: "72px",
        color: "#006699",
        // haloColor: "#4792c1",
        // haloSize: 1
      }
    }

    $.getJSON("./graphics.geojson", function (data) {
      pointsLables = new GeoJSONLayer({
        url: "./graphics.geojson",
        title: "Lables Countries",
        definitionExpression: "OBJECTID_1 = '1'",
        labelingInfo: [COName, attendedLiveEventCO, attendedLiveEventCO0, liveEventsAttendedCO, liveEventsAttendedCO0, infoLeftCO, infoRightCO],
        renderer: {
          type: "simple",
          symbol: {
            type: "web-style",
            name: "city-hall",
            styleName: "Esri2DPointSymbolsStyle"
          },
        },
        // popupTemplate: {
        //   title: "{Name}",
        //   content: [
        //     {
        //       type: "fields",
        //       fieldInfos: [
        //         {
        //           fieldName: "OBJECTID",
        //           label: "ID",
        //         },
        //         {
        //           fieldName: "Name",
        //           label: "Zone",
        //         },
        //       ],
        //     },
        //   ],
        // },
      });
      displayMap.add(pointsLables);
    });

    displayMap = new Map({
      basemap: "arcgis-light-gray",
      // layers: [
      //   layer
      // ],
    });

    view = new MapView({
      center: [-94.578331, 39.099724], // longitude, latitude, centered on Kansas City
      container: "displayMap",
      map: displayMap,
      zoom: 3,
      highlightOptions: {
        color: "#39ff14",
        haloOpacity: 0.9,
        fillOpacity: 0,
      },
    });

    const layer = new FeatureLayer({
      portalItem: {
        id: "a5210df5ce0f4f4fbda203ac4c291f1a"
      },
      title: "World Countries",
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: "#f3f3f3",
          outline: {
            width: 0.5,
            color: "#cfd3d4"
          }
        },
      },
      // labelingInfo: [countryName]
    });
    displayMap.add(layer);





    // view.on("click", function (event) {
    //   view.hitTest(event).then(function (response) {
    //     if (response.results.length) {
    //       let graphic = response.results.filter(function (result) {
    //         return (
    //           result.graphic.layer === KCMO_Neighborhoods ||
    //           result.graphic.layer === KansasCityBoundaries ||
    //           result.graphic.layer === District1_Neighborhoods ||
    //           result.graphic.layer === District2_Neighborhoods ||
    //           result.graphic.layer === District3_Neighborhoods ||
    //           result.graphic.layer === District4_Neighborhoods ||
    //           result.graphic.layer === District5_Neighborhoods ||
    //           result.graphic.layer === District6_Neighborhoods ||
    //           result.graphic.layer === District1_Merged ||
    //           result.graphic.layer === District2_Merged ||
    //           result.graphic.layer === District3_Merged ||
    //           result.graphic.layer === District4_Merged ||
    //           result.graphic.layer === District5_Merged ||
    //           result.graphic.layer === District6_Merged ||
    //           result.graphic.layer === Waldo ||
    //           result.graphic.layer === Brookside ||
    //           result.graphic.layer === MidtownPlaza ||
    //           result.graphic.layer === Downtown
    //         );
    //       })[0].graphic;
    //       view.goTo(
    //         {
    //           target: graphic,
    //         },
    //         {
    //           duration: 2000,
    //         }
    //       );
    //     }
    //   });
    // });

    await view.when();

    view.whenLayerView(pointsLables).then(function (layerView) {
      console.log(pointsLables)
      view.goTo(
        {
          target: pointsLables.fullExtent,
        },
        {
          duration: 2000,
        }
      );
    });
    
    //add widgets
    addWidgets()
      .then(([view, displayMap]) => {
        console.log(
          "Widgets Returned From Require Scope",
          view,
          displayMap,
          featureLayer
        );
        // You can work with the view object here
      })
      .catch((error) => {
        // Handle any errors here
      });

    return [view, displayMap]; // You can return the view object
  } catch (error) {
    console.error("Error initializing map:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}

// calling
initializeDynamicImage()
  .then(() => {
    console.log("Map Returned From Require Scope", displayMap);
    // You can work with the view object here
  })
  .catch((error) => {
    // Handle any errors here
  });

async function addWidgets() {
  try {
    // await initializeMap();

    const [
      Fullscreen,
      Expand,
      ScaleBar,
      Home,
    ] = await Promise.all([
      loadModule("esri/widgets/Fullscreen"),
      loadModule("esri/widgets/Expand"),
      loadModule("esri/widgets/ScaleBar"),
      loadModule("esri/widgets/Home"),
    ]);

    var fullscreen = new Fullscreen({
      view: view,
    });
    view.ui.add(fullscreen, "top-right");

    var scalebar = new ScaleBar({
      view: view,
      unit: "metric",
    });
    view.ui.add(scalebar, "bottom-right");

    var homeWidget = new Home({
      view: view,
    });
    view.ui.add(homeWidget, "top-left");

    await view.when();

    return [view, displayMap]; // You can return the view object
  } catch (error) {
    console.error("Error initializing map:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}

