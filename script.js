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
    const [esriConfig, Map, WebScene, MapView, SceneView, FeatureLayer, Legend, GeoJSONLayer, ImageElement, MediaLayer, ExtentAndRotationGeoreference, Extent] =
      await Promise.all([
        loadModule("esri/config"),
        loadModule("esri/Map"),
        loadModule("esri/WebScene"),
        loadModule("esri/views/MapView"),
        loadModule("esri/views/SceneView"),
        loadModule("esri/layers/FeatureLayer"),
        loadModule("esri/widgets/Legend"),
        loadModule("esri/layers/GeoJSONLayer"),
        loadModule("esri/layers/support/ImageElement"),
        loadModule("esri/layers/MediaLayer"),
        loadModule("esri/layers/support/ExtentAndRotationGeoreference"),
        loadModule("esri/geometry/Extent"),
      ]);

    esriConfig.apiKey =
      "AAPKabb4ac113be142e7adef32d7fd2de45aY6aflWLbwtR92ugWYzDFyFwkUhMcUnO3NfDw2xWbV5BuGoHs3-AYvj4iCGTB7fEQ"; // Will change it

    const region6 = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "#7f89a1",
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5],
      },
    };

    const region5 = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "#99977F",
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5],
      },
    };

    const region4 = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "#fffcd4",
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5],
      },
    };

    const region3 = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "#b1cdc2",
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5],
      },
    };

    const region2 = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "#38627a",
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5],
      },
    };

    const region1 = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "#0d2644",
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5],
      },
    };

    const renderer = {
      type: "unique-value", // autocasts as new ClassBreaksRenderer()
      field: "region",
      // normalizationField: "EDUCBASECY",
      legendOptions: {
        title: "by regions in Kansas City",
      },
      defaultSymbol: {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "black",
        style: "backward-diagonal",
        outline: {
          width: 0.5,
          color: [50, 50, 50, 0.6],
        },
      },
      defaultLabel: "no data",
      uniqueValueInfos: [
        {
          value: "REGION 1",
          symbol: region1,
          label: "Region 1",
        },
        {
          value: "REGION 2",
          symbol: region2,
          label: "Region 2",
        },
        {
          value: "REGION 3",
          symbol: region3,
          label: "Region 3",
        },
        {
          value: "REGION 4",
          symbol: region4,
          label: "Region 4",
        },
        {
          value: "REGION 5",
          symbol: region5,
          label: "Region 5",
        },
        {
          value: "REGION 6",
          symbol: region6,
          label: "Region 6",
        },
      ],
    };


    // function createTextSymbol(color) {
    //   return {
    //     type: "text", // autocasts as new TextSymbol()
    //     font: {
    //       size: 12,
    //       weight: "bold"
    //     },
    //     color: "white",
    //     haloColor: color,
    //     haloSize: 1
    //   };
    // }

    // const countryName = {
    //   labelExpressionInfo: {
    //     expression: $feature.Name
    //   },
    //   labelPlacement: "above-center",
    //   // where: "TEMP <= 32"
    // };
    // countryName.symbol = createTextSymbol("#4792c1");


    var CName = {
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

    var attendedLiveEvent1 = {
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

    var attendedLiveEvent2 = {
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

    var liveEventsAttended1 = {
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

    var liveEventsAttended2 = {
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

    var infoLeft = {
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

    var infoRight = {
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
        labelingInfo: [CName, attendedLiveEvent1, attendedLiveEvent2, liveEventsAttended1, liveEventsAttended2, infoLeft, infoRight],
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


    // #cfd3d4





    // $.getJSON("./layer.geojson", function (data) {
    //   worldC = new GeoJSONLayer({
    //     url: "./layer.geojson",
    //     title: "World Countries",
    //     renderer: {
    //       type: "simple",
    //       symbol: {
    //         type: "simple-fill",
    //         color: [244, 166, 33, 0.5],
    //         // outline: {
    //         //     width: 0.7,
    //         //     color: "#B30505"
    //         // }
    //       },
    //     },
    //     // popupTemplate: {
    //     //   title: "{Name}",
    //     //   content: [
    //     //     {
    //     //       type: "fields",
    //     //       fieldInfos: [
    //     //         {
    //     //           fieldName: "OBJECTID",
    //     //           label: "ID",
    //     //         },
    //     //         {
    //     //           fieldName: "Name",
    //     //           label: "Zone",
    //     //         },
    //     //       ],
    //     //     },
    //     //   ],
    //     // },
    //   });
    //   displayMap.add(worldC);
    // });






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
    
    let legend = new Legend({
      view: view,
      // layerInfos: [
      //   {
      //     layer: District1_Neighborhoods,
      //     title: "Region 1"
      //   },
      //   {
      //     layer: District2_Neighborhoods,
      //     title: "Region 2"
      //   },
      // ]
    });
    legend.headingLevel = 2;
    legend.style = {
      type: "card",
      layout: "stack",
    };
    legend.basemapLegendVisible = true;
    legend.hideLayersNotInCurrentView = true;
    view.ui.add(legend, "bottom-left");

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

    clickToDownloadScreenshot();
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
      BasemapGallery,
      Expand,
      ScaleBar,
      AreaMeasurement2D,
      Search,
      Home,
      LayerList,
    ] = await Promise.all([
      loadModule("esri/widgets/Fullscreen"),
      loadModule("esri/widgets/BasemapGallery"),
      loadModule("esri/widgets/Expand"),
      loadModule("esri/widgets/ScaleBar"),
      loadModule("esri/widgets/AreaMeasurement2D"),
      loadModule("esri/widgets/Search"),
      loadModule("esri/widgets/Home"),
      loadModule("esri/widgets/LayerList"),
    ]);

    var basemapGallery = new BasemapGallery({
      view: view,
    });

    var Expand22 = new Expand({
      view: view,
      content: basemapGallery,
      expandIcon: "basemap",
      group: "top-right",
      // expanded: false,
      expandTooltip: "Open Basmap Gallery",
      collapseTooltip: "Close",
    });
    view.ui.add([Expand22], { position: "top-right", index: 6 });

    var fullscreen = new Fullscreen({
      view: view,
    });
    view.ui.add(fullscreen, "top-right");

    var scalebar = new ScaleBar({
      view: view,
      unit: "metric",
    });
    view.ui.add(scalebar, "bottom-right");

    var search = new Search({
      //Add Search widget
      view: view,
    });
    view.ui.add(search, { position: "top-left", index: 0 }); //Add to the map

    var homeWidget = new Home({
      view: view,
    });
    view.ui.add(homeWidget, "top-left");

    var layerList = new LayerList({
      view: view,
      listItemCreatedFunction: function (event) {
        var item = event.item;
        // displays the legend for each layer list item
        item.panel = {
          content: "legend",
        };
      },
      showLegend: true,
    });

    layerList.visibilityAppearance = "checkbox";
    var Expand5 = new Expand({
      view: view,
      content: layerList,
      expandIcon: "layers",
      group: "top-right",
      // expanded: false,
      expandTooltip: "Layer List",
      collapseTooltip: "Close",
    });

    view.ui.add([Expand5], { position: "top-left", index: 6 });
    view.ui.add("controlsWidget", "top-right");

    await view.when();

    return [view, displayMap]; // You can return the view object
  } catch (error) {
    console.error("Error initializing map:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}

async function clickToDownloadScreenshot() {
  try {
    console.log("Hi in Screenshot function...");

    document
      .getElementById("takeScreenshotButton")
      .addEventListener("click", () => {
        view.takeScreenshot().then((screenshot) => {
          console.log(screenshot.dataUrl);
          downloadImage("screenshot.png", screenshot.dataUrl);
        });
      });

    // helper function directly from
    // https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=sceneview-screenshot
    function downloadImage(filename, dataUrl) {
      // the download is handled differently in Microsoft browsers
      // because the download attribute for <a> elements is not supported
      if (!window.navigator.msSaveOrOpenBlob) {
        // in browsers that support the download attribute
        // a link is created and a programmatic click will trigger the download
        const element = document.createElement("a");
        element.setAttribute("href", dataUrl);
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } else {
        // for MS browsers convert dataUrl to Blob
        const byteString = atob(dataUrl.split(",")[1]);
        const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        // download file
        window.navigator.msSaveOrOpenBlob(blob, filename);
      }
    }

    await view.when();

    return [view, displayMap]; // You can return the view object
  } catch (error) {
    console.error("Error initializing map:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}

