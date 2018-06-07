angular.module('app.controllers', [])

.controller('principalCtrl', ['$scope', '$stateParams', '$state', '$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout) {
  $scope.goTo = function(){
    $state.go("menu");
  }

  $timeout(function(){
    $scope.goTo();
  }, 3000);
}])

.controller('menuCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', '$ionDrawerVerticalDelegate', '$timeout', '$window', '$cordovaInAppBrowser',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicPopup, $ionDrawerVerticalDelegate, $timeout, $window, $cordovaInAppBrowser) {

  $scope.goTo = function(opcao){
    if (opcao == 'menu') { $state.go("menu"); $scope.toggleDrawer(); }
    if (opcao == 'ajuda') { $state.go("ajuda"); }
    if (opcao == 'avaliacao') {

      $scope.toggleDrawer();

      var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
      };

      $cordovaInAppBrowser.open('https://play.google.com/apps?hl=pt', '_blank', options)
        .then(function(event) {})
        .catch(function(event) {});

    }
    if (opcao == 'sobre') { $state.go("sobre"); }
    if (opcao == 'sua_voz') { $state.go("suaVoz"); }
    if (opcao == 'noticias') { $state.go("noticias", {menu: 'menu'}); }
    if (opcao == 'deu_certo') { $state.go("deuCerto"); }
    if (opcao == 'empregos') { $state.go("empregos"); }
    if (opcao == 'prefeitura') { $state.go("prefeitura"); }
    if (opcao == 'cidade') { $state.go("cidade"); }
    if (opcao == 'site') {

      var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
      };

      $cordovaInAppBrowser.open('http://facebook.com.br/prefeituradecampobom', '_blank', options)
        .then(function(event) {})
        .catch(function(event) {}
      );

    }
  };

  $scope.toggleDrawer = function() {
	  $ionDrawerVerticalDelegate.toggleDrawer();
	};

  window.addEventListener("orientationchange", function(){
    var controllerElement = document.getElementById('page-menu');
    var controllerScope = angular.element(controllerElement).scope();
    controllerScope.$apply(function() {
      controllerScope.orientation__ = screen.orientation.type;
    });
  });

  $scope.orientation__ = screen.orientation.type;

  $scope.itens = {
    logo : {width: 0, height:0},
    icones : {width: 0, height:0},
    uptec : {width: 0, height:0}
  };

  $scope.paint = function() {

    var logoTamOriginal = {
      width: 256,
      height: 92
    };

    var tablePadding = 40;
    var valor = parseInt(window.innerHeight * 0.82);
    var icones = parseInt(logoHeight = valor * 0.2);
    var uptec = parseInt(valor * 0.05);
    var logoWidth = parseInt((logoTamOriginal.width * logoHeight) / logoTamOriginal.height);

    $scope.itens.uptec.width = uptec;
    $scope.itens.uptec.height = uptec;

    $scope.itens.icones.width = icones;
    $scope.itens.icones.height = icones;

    $scope.itens.logo.width = logoWidth;
    $scope.itens.logo.height = logoHeight;

    var table = $scope.itens.logo.height + ($scope.itens.icones.height * 3) + $scope.itens.uptec.height + tablePadding;

    var tela = jQuery(".div-principal-menu").height(); //10 é o padding da div
    var margin = (tela - table) / 2;
    jQuery(".tbl-icones").css("margin-top", margin + "px");

  };

  var init = function(){
    var demandas = localStorage.getItem('APP_PMCB_INIT') || 'false';
    if (demandas == 'false') {
      localStorage.setItem('APP_PMCB_INIT', 'true');
      $scope.goTo("ajuda");
    } else {
      $scope.paint();
    }

    $timeout(function() {
      jQuery("#div-img-principal").fadeOut("slow");
    }, 4000);
  }

  init();

}])

.controller('ajudaCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$timeout', '$ionDrawerVerticalDelegate', '$ionicSlideBoxDelegate',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $stateParams, $state, $timeout, $ionDrawerVerticalDelegate, $ionicSlideBoxDelegate) {

  $scope.toggleDrawer = function() {
	  $ionDrawerVerticalDelegate.toggleDrawer();
	};

  $scope.goTo = function(opcao) {
    if (opcao == 'menu') { $state.go("menu"); }
    if (opcao == 'ajuda') { $state.go("ajuda"); $scope.toggleDrawer(); }
    if (opcao == 'avaliacao') { $state.go("avaliacao"); }
    if (opcao == 'sobre') { $state.go("sobre"); }
  };

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    console.log('Slide change is beginning');
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
  });

  $scope.next = function() {
    $scope.slider.slideNext();
  }

  $scope.prev = function() {
    $scope.slider.slidePrev();
  }

  $scope.sair = function() {
    $scope.goTo('menu');
  }

  window.addEventListener("orientationchange", function(){
    var controllerElement = document.getElementById('page-ajuda');
    var controllerScope = angular.element(controllerElement).scope();
    controllerScope.$apply(function() {
      controllerScope.orientation__ = screen.orientation.type;
    });
  });

  $scope.orientation__ = screen.orientation.type;

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);
}])

.controller('avaliacaoCtrl', ['$scope', '$stateParams', '$state', '$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout) {

  $scope.avaliar = [
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false}
  ];

  $scope.selecionar = function(index) {
    $scope.avaliar.map(function(item, i){
      if (i <= index) {
        item.selecionado = true;
      } else {
        item.selecionado = false;
      }
    });
  };

  $scope.goTo = function(opcao){
    if (opcao == 'menu') { $state.go("menu"); }
  };

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);
}])

.controller('sobreCtrl', ['$scope', '$stateParams', '$state', '$ionDrawerVerticalDelegate', '$timeout', '$cordovaInAppBrowser', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionDrawerVerticalDelegate, $timeout, $cordovaInAppBrowser, $ionicPopup) {

  $scope.toggleDrawer = function() {
	  $ionDrawerVerticalDelegate.toggleDrawer();
	};

  $scope.goTo = function(opcao) {
    if (opcao == 'menu') { $state.go("menu"); }
    if (opcao == 'ajuda') { $state.go("ajuda"); }
    if (opcao == 'avaliacao') {

      $scope.toggleDrawer();

      var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
      };

      $cordovaInAppBrowser.open('https://play.google.com/apps?hl=pt', '_blank', options)
        .then(function(event) {})
        .catch(function(event) {});
    }
    if (opcao == 'site') {

      var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
      };

      $cordovaInAppBrowser.open('http://uptecbr.com/', '_blank', options)
        .then(function(event) {})
        .catch(function(event) {});
    }
    if (opcao == 'face') {

      var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
      };

      $cordovaInAppBrowser.open('https://www.facebook.com/uptecnologiabr/', '_blank', options)
        .then(function(event) {})
        .catch(function(event) {});
    }
    if (opcao == 'sobre') { $state.go("sobre"); $scope.toggleDrawer(); }

  };

  $scope.alertModal = function() {
    myPopup = $ionicPopup.show({
      title: '<p class="avaliacao-titulo">Mensagem</p>',
      template: '<p class="avaliacao-pergunta">Email copiado com sucesso.</p>',
      scope: $scope,
      buttons: [
        {
          text: '<b>Ok</b>',
          type: 'popclose',
          onTap: function(e) {
          }
        }
      ]
    });
  };

  $scope.copy = function(email) {
    jQuery("#p1").html(email);
		copyToClipboard('#p1');
    $scope.alertModal();
  };

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  $scope.imagem = {
    width: 0,
    height: 0,
    metade: 0,
    info: 0,
    rodape: 0,
    separador: 6
  };

  var init = function() {
    $scope.imagem.width = window.innerWidth;
    $scope.imagem.height = window.innerHeight;
    $scope.imagem.metade = parseInt(window.innerHeight / 2);
    $scope.imagem.info = parseInt($scope.imagem.metade * 0.8);
    $scope.imagem.rodape  = parseInt($scope.imagem.metade * 0.2) - $scope.imagem.separador;
  }

  init();
}])

.controller('suaVozCtrl', ['$scope', '$stateParams', '$state', '$http', '$ionDrawerVerticalDelegate', '$timeout', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $http, $ionDrawerVerticalDelegate, $timeout, $ionicPopup) {

  $scope.demandas = []

  $scope.doSomething = function(){
    $state.go("menu");
  }

  $scope.goTo = function(opcao){
    if (opcao == 'menu') { $state.go("menu"); }
    if (opcao == 'demanda') { $state.go("demanda"); }
  };

  $scope.demandasCadastradas = function() {

    var serial = "";
    if (typeof device != "undefined") {
      serial = device.serial;
    }

    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/demandas/"+ serial;
    //var url = "http://vetorello.com.br/conecta_cb/public/demandas/"+ serial;
    $http({
      method : "GET",
      url : url,
      params : {}
    }).then(function (result) {
      var data = JSON.parse(JSON.stringify(result));
      $scope.demandas = data.data.dados || [];
    }, function (error) {
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }

      myPopup = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">Mensagem</p>',
        template: '<p class="avaliacao-pergunta">' + msg + '</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
            }
          }
        ]
      });
    });
  };

  $scope.pad = function(id){
    return str_pad(id, 8, '0', 'STR_PAD_LEFT');
  };

  $scope.visualizarSeparador = function(index) {
    if (index < ($scope.demandas.length - 1)) {
      return true;
    } else {
      return false;
    }
  };

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  var init = function(){
    $scope.demandasCadastradas();
  }

  init();
}])

.controller('demandaCtrl', ['$scope', '$stateParams', '$state', '$ionDrawerVerticalDelegate', '$cordovaCamera', '$cordovaFile', '$cordovaFileTransfer', '$cordovaDevice', '$ionicPopup', '$cordovaActionSheet', '$cordovaGeolocation', '$ionicLoading', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionDrawerVerticalDelegate, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet, $cordovaGeolocation, $ionicLoading, $timeout) {

  $scope.data = {};

  $scope.popupAction = "";
  $scope.popupMessage = "";
  $scope.popupTitulo = "";

  $scope.goTo = function(opcao){
    if (opcao == 'suaVoz') { $state.go("suaVoz"); }
  };

  $scope.selectables = [
    "25 de Julho",
    "4 Colônias",
    "Alto Paulista",
    "Aurora",
    "Barrinha",
    "Bela Vista",
    "Celeste",
    "Centro",
    "Cohab Leste",
    "Cohab Sul",
    "Colina Deuner",
    "Firenze",
    "Genuíno Sampaio",
    "Germano Sampaio",
    "Imigrante Norte",
    "Imigrante Sul",
    "Ind Sul",
    "Ipiranga",
    "Jardim do Sol",
    "Jardim Flores",
    "Jardim Sol",
    "Leão XIII",
    "Loteamento Blumeng",
    "Metzler",
    "Mônaco",
    "Operária",
    "Operário",
    "Paulista",
    "Porto Blos",
    "Primavera",
    "Quatro Colônias",
    "Rio Branco",
    "Santa Lúcia",
    "Santo Antônio",
    "Vila Augusta",
    "Vila Celeste",
    "Vila Gringos",
    "Vila Leopoldina",
    "Vila Nova",
    "Vila Rica",
    "Zona Industrial",
    "Zona Industrial Norte",
    "Zona Industrial Sul",
    "Zona Rural"
  ];

  $scope.image = null;

  $scope.bairro = "Selecione";

  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };

  var myPopup = {};

  $scope.alertModal = function() {
    myPopup = $ionicPopup.show({
      title: '<p class="avaliacao-titulo">' + $scope.popupTitulo + '</p>',
      template: '<p class="avaliacao-pergunta">{{popupMessage}}</p>',
      scope: $scope,
      buttons: [
        {
          text: '<b>Ok</b>',
          type: 'popclose',
          onTap: function(e) {
            if ($scope.popupAction == "true") {
              $state.go("suaVoz");
            }
          }
        }
      ]
    });
  }

  $scope.loadImage = function() {
    myPopup = $ionicPopup.show({
      title: '<p class="avaliacao-titulo">Escolha da Imagem</p>',
      template: '<div><p class="avaliacao-pergunta">'+
                  '<button class="button button-block popclose" ng-click="tirarFoto()">Tirar foto</button>'+
                '</p>'+
                '<p class="avaliacao-pergunta">'+
                  '<button class="button button-block popclose" ng-click="buscarGaleria()">Buscar da Galeria</button>'+
                '</p><div>',
      scope: $scope,
      buttons: [
        {
          text: '<b>Cancelar</b>',
          type: 'popclose',
          onTap: function(e) {
          }
        }
      ]
    });
  }

  $scope.tirarFoto = function(){
    myPopup.close();
    type = Camera.PictureSourceType.CAMERA;
    $scope.selectPicture(type);
  };

  $scope.buscarGaleria = function(){
    myPopup.close();
    type = Camera.PictureSourceType.PHOTOLIBRARY;
    $scope.selectPicture(type);
  };

  $scope.loadImage_ = function() {
    var options = {
      title: 'Escolha da Imagem',
      buttonLabels: ['Tirar foto', 'Buscar na galeria'],
      addCancelButtonWithLabel: 'Cancelar',
      androidEnableCancelButton : true,
    };

    $cordovaActionSheet.show(options).then(function(btnIndex) {
      var type = null;
      if (btnIndex === 2) {
        type = Camera.PictureSourceType.PHOTOLIBRARY;
      } else if (btnIndex === 1) {
        type = Camera.PictureSourceType.CAMERA;
      }
      if (type !== null) {
        $scope.selectPicture(type);
      }
    });
  };

  // Take image with the camera or from library and store it inside the app folder
  // Image will not be saved to users Library.
  $scope.selectPicture = function(sourceType) {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imagePath) {

      // Grab the file name of the photo in the temporary directory
      var currentName = imagePath.replace(/^.*[\\\/]/, '');

      //Create a new name for the photo
      var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";

      // If you are trying to load image from the gallery on Android we need special treatment!
      if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        window.FilePath.resolveNativePath(imagePath, function(entry) {
          window.resolveLocalFileSystemURL(entry, success, fail);
          function fail(e) {
            $scope.popupAction = "false";
            $scope.popupTitulo = "Erro [E1]";
            $scope.popupMessage = "Falha ao carregar a imagem. \n Tente novamente.";
            $scope.alertModal();
            //console.error('Error: ', e);
            //alert('Error: ' + e);
          }

          function success(fileEntry) {
            var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
            // Only copy because of access rights
            $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
              $scope.image = newFileName;
            }, function(error){
              $scope.popupAction = "false";
              $scope.popupTitulo = "Erro [E2]";
              $scope.popupMessage = "Erro código: " + error.exception;
              $scope.alertModal();
              //alert('Error', error.exception);
            });
          };
        }
      );
      } else {
        var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        // Move the file to permanent storage
        $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
          $scope.image = newFileName;
        }, function(error){
          $scope.popupAction = "false";
          $scope.popupTitulo = "Erro [E3]";
          $scope.popupMessage = "Erro código: " + error.exception;
          $scope.alertModal();
        });
      }
    },
    function(err){
      // Not always an error, maybe cancel was pressed...
      $scope.popupAction = "false";
      $scope.popupTitulo = "Erro [E4]";
      $scope.popupMessage = "Falha ao carregar a imagem. \n Tente novamente.";
      $scope.alertModal();
    })
  };

  // Returns the local path inside the app for an image
  $scope.pathForImage = function(image) {
    if (image === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + image;
    }
  };

  $scope.uploadImage = function() {
    $scope.errorMessage = [];
    var dados = {
      endereco       : $scope.data.endereco       || "",
      numero         : $scope.data.numero         || "",
      bairro         : $scope.data.bairro         || "",
      complemento    : $scope.data.complemento    || "",
      titulo         : $scope.data.titulo         || "",
      descricao      : $scope.data.descricao      || "",
      nome           : $scope.data.nome           || "",
      email          : $scope.data.email          || "",
      celular        : $scope.data.celular        || "",
      whatsapp       : $scope.data.whatsapp       || "",
      serial_celular : $scope.data.serial_celular || ""
    }

    if (dados.endereco == "") {
      $scope.errorMessage.push("Endereço é obrigatório.");
    }

    if (dados.bairro == "Selecione" || dados.bairro == "") {
      $scope.errorMessage.push("Bairro é obrigatório.");
    }

    if (dados.titulo == "") {
      $scope.errorMessage.push("Título é obrigatório.");
    }

    if (dados.descricao == "") {
      $scope.errorMessage.push("Descrição é obrigatório.");
    }

    if (dados.nome == "") {
      $scope.errorMessage.push("Nome é obrigatório.");
    }

    if (dados.celular == "" && dados.telefone == "") {
      $scope.errorMessage.push("Telefone é obrigatório.");
    }

    if ($scope.errorMessage.length > 0) {
      myPopup = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">Erro</p>',
        template: '<p ng-repeat="item in errorMessage" class="avaliacao-pergunta">{{item}}</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
            }
          }
        ]
      });
      return false;
    }

    // Destination URL
    //var url = "https://aplicativo.campobom.rs.gov.br/conecta_cb/public/upload";
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/upload";

    // File for Upload
    var targetPath = $scope.pathForImage($scope.image);

    // File name only
    var filename = $scope.image;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename, 'dados': dados}
    };

    $ionicLoading.show();
    $cordovaFileTransfer.upload(url, targetPath, options, true).then(function(result) {
      $ionicLoading.hide();
      var data = JSON.stringify(result.response);
      data = data.replace('"', '').replace('"', '').split("||");
      $scope.popupAction = data[0];
      $scope.popupMessage = data[1];
      if ($scope.popupAction == "true") {
        $scope.popupTitulo = "Sucesso";
      } else {
        $scope.popupTitulo = "Erro [E6]";
      }
      $scope.alertModal();
    }, function(error) {
      $scope.serverReturnData = error;
      $ionicLoading.hide();
      $scope.popupAction = "false";
      $scope.popupTitulo = "Erro [E5]";
      $scope.popupMessage = "Código erro: " + JSON.stringify(error);
      $scope.alertModal();
    });
  }

  $scope.posOptions = {
    enableHighAccuracy: true, //correto para o navegador
    timeout: 20000, //correto para o navegador
    maximumAge: 0
  };

  $scope.getGeo = function(){

      $ionicLoading.show();

      $cordovaGeolocation.getCurrentPosition($scope.posOptions).then(function (position) {

        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        var myLatlng = new google.maps.LatLng(lat, long);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        $scope.geocodeLatLng(geocoder, map, infowindow, myLatlng);
        $scope.map = map;
        $ionicLoading.hide();

    }, function(err) {
        $ionicLoading.hide();
        alert("Verifique se o GPS está ligado. \n" + JSON.stringify(err));
    });
  }

  $scope.geocodeLatLng = function (geocoder, map, infowindow, myLatlng) {
    //var input = document.getElementById('latlng').value;
    //var latlngStr = input.split(',', 2);
    //var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

    var latlng = myLatlng;
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);

          //console.log("address_components", results[0].address_components);
          //console.log("address 1", results[0].address_components[0].long_name);
          //console.log("address 2", results[0].address_components[1].long_name);
          //console.log("address 3", results[0].address_components[2].long_name);
          //console.log("address 4", results[0].address_components[3].long_name);
          //console.log("address 5", results[0].address_components[4].long_name);
          //console.log("address 6", results[0].address_components[5].short_name);
          //console.log("address 7", results[0].address_components[6].long_name);
          //console.log("address 8", results[0].address_components[7].long_name);

          $scope.data.numero = results[0].address_components[0].long_name;
          $scope.data.endereco = results[0].address_components[1].long_name;
          $scope.data.bairro = results[0].address_components[2].long_name;

          $timeout(function() {
            setTeste(results[0]);
          }, 1);

        } else {
          alert('Endereço não encontrado');
        }
      } else {
        alert('Falha no serviço de localização: código' + status);
      }
    });
  }

  $scope.setLocalidade = function(info){
  };

  var setTeste = function(info){
  }

  $scope.$watch('data.celular', function(newValue, oldValue) {
    $scope.data.whatsapp = newValue;
  });

  $scope.apagarWhatsapp = function() {
    $scope.data.whatsapp = "";
  };

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  var init = function(){
    if (typeof device != "undefined") {
      $scope.data.serial_celular = device.serial;
    }
  };

  init();

}])

.controller('noticiasCtrl', ['$scope', '$stateParams', '$state', '$http', '$cordovaFileTransfer', '$ionicPopup', '$ionicLoading', '$ionicScrollDelegate', '$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $http, $cordovaFileTransfer, $ionicPopup, $ionicLoading, $ionicScrollDelegate, $timeout) {

  $scope.noticias = [];
  $scope.popupMessage = "";
  $scope.page = null;

  $scope.goTo = function(opcao){
    if (opcao == 'menu') { $state.go("menu"); }
  };

  $scope.visualizarNoticia = function(noticia) {
    $state.go('visualizar', { noticia: noticia});
  };

  var myPopup = {};

  $scope.alertModal = function() {
    myPopup = $ionicPopup.show({
      title: '<p class="avaliacao-titulo">Erro</p>',
      template: '<p class="avaliacao-pergunta">{{popupMessage}}</p>',
      scope: $scope,
      buttons: [
        {
          text: '<b>Ok</b>',
          type: 'popclose',
          onTap: function(e) {
          }
        }
      ]
    });
  }

  $scope.listarNoticias = function(page, load) {
    if (load) $ionicLoading.show();
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/listagemNoticias/" + page;
    //var url = "http://vetorello.com.br/conecta_cb/public/listarNoticias";
    $http({
      method : "GET",
      url : url,
      params : {}
    }).then(function (result) {
      var data = JSON.parse(JSON.stringify(result));
      if (data.data.status == "true") {
        if (load) $ionicLoading.hide();
        let noticias = data.data.dados || [];
        if (localStorage.getItem('noticias') == null) {
          localStorage.setItem('noticias', JSON.stringify(noticias));
          $scope.noticias = noticias;
        } else {
          $scope.noticias = JSON.parse(localStorage.getItem("noticias"));
          noticias.map(function(item, index){
            $scope.noticias.push(item);
          });
          localStorage.setItem('noticias', JSON.stringify($scope.noticias));
        }
      } else {
        $ionicLoading.hide();
        $scope.popupMessage = data.data.msg;
        $scope.alertModal();
      }
    }, function (error) {
      //$scope.popupMessage = "Código: " + error.status;
      if (load) $ionicLoading.hide();
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }
      $scope.popupMessage = msg;
      $scope.alertModal();
    });
  };

  $scope.requisicao = false;

  $scope.onDragDown = function(event) {
    $scope.requisicao = false;
  }

  $scope.onDragUp = function(event) {
    $scope.requisicao = true;
  }

  $scope.onRelease = function(event) {
    if ($scope.requisicao) {
      let page = parseInt(localStorage.getItem('page')) + 1;
      localStorage.setItem('page', page);
      $scope.listarNoticias(page, false);
    }
  }

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  $scope.initBusca = function() {
    localStorage.removeItem("noticias");
    $scope.listarNoticias(1, true);
    localStorage.setItem('page', 1);
  }

  var init = function() {    
    if (typeof $stateParams.menu == "undefined") {
      $scope.initBusca();
    } else {
      if ($stateParams.menu == "menu") {
        $scope.initBusca();
      } else {
        if (localStorage.getItem("noticias") == null) {
          $scope.initBusca();
        } else {
          let noticias = localStorage.getItem("noticias");
          $scope.noticias = JSON.parse(noticias);
        }
      }
    }
  }

  init();
}])

.controller('deuCertoCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$ionicPopup', '$http', '$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicLoading, $ionicPopup, $http, $timeout) {

  $scope.deuCerto = [];
  $scope.popupTitulo = "";
  $scope.popupMessage = "";

  $scope.goTo = function(opcao){
    if (opcao == 'menu') { $state.go("menu"); }
  }

  var myPopup = {};

  $scope.alertModal = function() {
    myPopup = $ionicPopup.show({
      title: '<p class="avaliacao-titulo">' + $scope.popupTitulo + '</p>',
      template: '<p class="avaliacao-pergunta">{{popupMessage}}</p>',
      scope: $scope,
      buttons: [
        {
          text: '<b>Ok</b>',
          type: 'popclose',
          onTap: function(e) {
          }
        }
      ]
    });
  }

  $scope.listarDeuCerto = function() {
    $ionicLoading.show();
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/listarDeuCerto";
    //var url = "http://vetorello.com.br/conecta_cb/public/listarDeuCerto";    
    $http({
      method : "GET",
      url : url,
      params : {}
    }).then(function (result) {
      var data = JSON.parse(JSON.stringify(result));
      $scope.deuCerto = data.data.dados || [];
      $ionicLoading.hide();
    }, function (error) {
      $ionicLoading.hide();
      $scope.popupTitulo = "Erro";
      //$scope.popupMessage = "Código: " + error.status;
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }
      $scope.popupMessage = msg;
      $scope.alertModal();
    });
  };

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  var init = function() {
    $scope.listarDeuCerto();
  }

  init();
}])

.controller('empregosCtrl', ['$scope', '$stateParams', '$state', '$http', '$ionicLoading', '$timeout', '$ionicPopup', '$cordovaInAppBrowser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $http, $ionicLoading, $timeout, $ionicPopup, $cordovaInAppBrowser) {

  $scope.vagas = [];

  $scope.goTo = function(opcao){
    if (opcao == 'menu') { $state.go("menu"); }
    if (opcao == 'cadastrar') { $state.go("cadastrar"); }
  }

  $scope.vagasCadastradas = function() {
    $ionicLoading.show();
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/listarVagas";
    //var url = "http://vetorello.com.br/conecta_cb/public/listarVagas";
    $http({
      method : "GET",
      url: url,
      params : {}
    }).then(function (result) {
      $ionicLoading.hide();
      var data = JSON.parse(JSON.stringify(result));
      if (data.data.status == "true") {
        $scope.vagas = data.data.dados || [];
        $scope.vagas.map(function(item){
          item.fone = str_replace(['(', ')', '-', ' '], '', item.telefone);
        });
      } else {
        myPopup = $ionicPopup.show({
          title: '<p class="avaliacao-titulo">Mensagem</p>',
          template: '<p class="avaliacao-pergunta">' + data.data.msg || 'Entre em contato com o administrador do aplicativo.' + '</p>',
          scope: $scope,
          buttons: [
            {
              text: '<b>Ok</b>',
              type: 'popclose',
              onTap: function(e) {
              }
            }
          ]
        });
      }
    }, function (error) {
      $ionicLoading.hide();
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }

      myPopup = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">Mensagem</p>',
        template: '<p class="avaliacao-pergunta">' + msg + '</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
            }
          }
        ]
      });
    });
  };

  $scope.alertModal = function() {
    myPopup = $ionicPopup.show({
      title: '<p class="avaliacao-titulo">Mensagem</p>',
      template: '<p class="avaliacao-pergunta">Email copiado com sucesso.</p>',
      scope: $scope,
      buttons: [
        {
          text: '<b>Ok</b>',
          type: 'popclose',
          onTap: function(e) {
          }
        }
      ]
    });
  };

  $scope.copy = function(email) {
    jQuery("#p1").html(email);
		copyToClipboard('#p1');
    $scope.alertModal();
  };

  $scope.redirect = function(site) {
    if (site.indexOf('http://') < 0) {
      site = 'http://' + site;
    }

    var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
      };

      $cordovaInAppBrowser.open(site, '_blank', options)
        .then(function(event) {})
        .catch(function(event) {});
  };

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  var init = function() {
    $scope.vagasCadastradas();
  }

  init();
}])

.controller('prefeituraCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$ionicPopup', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, $ionicPopup, $http) {

  $scope.goTo = function(opcao){
    if (opcao == 'menu') { $state.go("menu"); }
  }

  $scope.cargos = [];

  $scope.alertModal = function() {
    myPopup = $ionicPopup.show({
      title: '<p class="avaliacao-titulo">Mensagem</p>',
      template: '<p class="avaliacao-pergunta">Email copiado com sucesso.</p>',
      scope: $scope,
      buttons: [
        {
          text: '<b>Ok</b>',
          type: 'popclose',
          onTap: function(e) {
          }
        }
      ]
    });
  };

  $scope.copy = function(email) {
    jQuery("#p1").html(email);
		copyToClipboard('#p1');
    $scope.alertModal();
  };

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  $scope.heightDiv = 0;

  $scope.getInfoPrefeitura = function() {
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/getInfoPrefeitura";
    //var url = "http://vetorello.com.br/conecta_cb/public/getInfoPrefeitura";
    $http({
      method : "GET",
      url : url,
      params : {}
    }).then(function (result) {
      var data = JSON.parse(JSON.stringify(result));
      if (data.data.status == "true") {
        $scope.cargos = data.data.dados || [];
      } else {
        myPopup = $ionicPopup.show({
          title: '<p class="avaliacao-titulo">Mensagem</p>',
          template: '<p class="avaliacao-pergunta">' + data.data.msg || 'Entre em contato com o administrador do aplicativo.' + '</p>',
          scope: $scope,
          buttons: [
            {
              text: '<b>Ok</b>',
              type: 'popclose',
              onTap: function(e) {
              }
            }
          ]
        });
      }
    }, function (error) {

      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }

      myPopup = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">Mensagem</p>',
        template: '<p class="avaliacao-pergunta">' + msg + '</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
            }
          }
        ]
      });
    });
  }

  var init = function() {
    var widthTela = window.innerWidth;
    $scope.heightDiv = parseInt((window.innerWidth * 703 / 1080) + 10);
    $scope.getInfoPrefeitura();
  }

  init();
}])

.controller('cidadeCtrl', ['$scope', '$stateParams', '$state', '$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout) {

  $scope.goTo = function(opcao){
    if (opcao == 'menu') { $state.go("menu"); }
    if (opcao == 'simbolos') { $state.go("simbolos"); }
    if (opcao == 'historia') { $state.go("historia"); }
    if (opcao == 'telefones_uteis') { $state.go("telefonesUteis"); }
    if (opcao == 'numeros_importantes') { $state.go("numerosImportantes"); }
    if (opcao == 'downloads') { $state.go("downloads"); }
    if (opcao == 'cinema') { $state.go("cinema"); }
    if (opcao == 'podas') { $state.go("podas"); }
  }

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  var init = function() {
  }

  init();

}])

.controller('cadastrarCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', '$http', '$ionicLoading', '$timeout',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicPopup, $http, $ionicLoading, $timeout) {

  $scope.data = {};

  $scope.popupTitulo = "";
  $scope.popupMsg = "";
  $scope.popupRedirect = false;

  $scope.goTo = function(opcao){
    if (opcao == 'empregos') { $state.go("empregos"); }
  }

  $scope.mensagem = function() {
    myPopupMsg = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">' + $scope.popupTitulo + '</p>',
        template: '<p class="avaliacao-pergunta">{{popupMsg}}</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
              if ($scope.popupRedirect) {
                $scope.goTo('empregos');
              }
            }
          }
        ]
      });
  }

  $scope.enviar = function() {

    var serial_celular = null;
    if (typeof device != "undefined") {
      serial_celular = device.serial;
    }

    var dados = {
      nome_empresa    : $scope.data.nome_empresa    || "",
      cargo_oferecido : $scope.data.cargo_oferecido || "",
      descricao_cargo : $scope.data.descricao_cargo || "",
      telefone        : $scope.data.telefone        || "",
      email           : $scope.data.email           || "",
      site            : $scope.data.site            || "",
      serial_celular  : serial_celular              || ""
    };

    $scope.errorMessage = [];

    if (dados.nome_empresa == "") {
      $scope.errorMessage.push("Nome da Empresa é obrigatório.");
    }

    if (dados.cargo_oferecido == "") {
      $scope.errorMessage.push("Cargo Oferecido é obrigatório.");
    }

    if (dados.descricao_cargo == "") {
      $scope.errorMessage.push("Descricao do cargo é obrigatório.");
    }

    if (dados.telefone == "") {
      $scope.errorMessage.push("Telefone é obrigatório.");
    }

    if ($scope.errorMessage.length > 0) {
      myPopup = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">Erro</p>',
        template: '<p ng-repeat="item in errorMessage" class="avaliacao-pergunta">{{item}}</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
            }
          }
        ]
      });
      return false;
    }

    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/cadastrarVagas";
    //var url = "http://vetorello.com.br/conecta_cb/public/cadastrarVagas";

    $ionicLoading.show();
    $http({
      method : "GET",
      url : url,
      params : {'dados': dados}
    }).then(function (result) {
      $ionicLoading.hide();
      var data = JSON.parse(JSON.stringify(result));
      if (data.data.status == 'true') {
        $scope.popupTitulo = "Sucesso";
        $scope.popupMsg = data.data.msg;
        $scope.popupRedirect = true;
      } else {
        $scope.popupTitulo = "Erro";
        $scope.popupMsg = data.data.msg;
        $scope.popupRedirect = false;
      }

      $scope.mensagem();

    }, function (error) {
      $ionicLoading.hide();
      $scope.popupTitulo = "Erro";
      //$scope.popupMsg = "Código de erro:" + error.status;
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }
      $scope.popupMsg = msg;
      $scope.popupRedirect = false;
      $scope.mensagem();
    });
  }

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  var init = function() {
  }

  init();
}])

.controller('simbolosCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$ionicPopup', '$ionicLoading', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, $ionicPopup, $ionicLoading, $http) {

  $scope.info = {};

  $scope.goTo = function(opcao){
    if (opcao == 'cidade') { $state.go("cidade"); }
  }

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  $scope.getSimbolosMunicipais = function() {
    $ionicLoading.show();
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/getSimbolosMunicipais";
    //var url = "http://vetorello.com.br/conecta_cb/public/getSimbolosMunicipais";
    $http({
      method : "GET",
      url: url,
      params : {}
    }).then(function (result) {
      $ionicLoading.hide();
      var data = JSON.parse(JSON.stringify(result));
      if (data.data.status == "true") {
        $scope.info = data.data.dados || {};
      } else {
        myPopup = $ionicPopup.show({
          title: '<p class="avaliacao-titulo">Mensagem</p>',
          template: '<p class="avaliacao-pergunta">' + data.data.msg || 'Entre em contato com o administrador do aplicativo.' + '</p>',
          scope: $scope,
          buttons: [
            {
              text: '<b>Ok</b>',
              type: 'popclose',
              onTap: function(e) {
              }
            }
          ]
        });
      }
    }, function (error) {
      $ionicLoading.hide();
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }

      myPopup = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">Mensagem</p>',
        template: '<p class="avaliacao-pergunta">' + msg + '</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
            }
          }
        ]
      });
    });
  };

  var init = function() {
    $scope.getSimbolosMunicipais();
  }

  init();
}])

.controller('historiaCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$ionicPopup', '$ionicLoading', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, $ionicPopup, $ionicLoading, $http) {

  $scope.info = {};

  $scope.goTo = function(opcao){
    if (opcao == 'cidade') { $state.go("cidade"); }
  }

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  $scope.getHistoriaCidade = function() {
    $ionicLoading.show();
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/getHistoriaCidade";
    //var url = "http://vetorello.com.br/conecta_cb/public/getHistoriaCidade";
    $http({
      method : "GET",
      url: url,
      params : {}
    }).then(function (result) {
      $ionicLoading.hide();
      var data = JSON.parse(JSON.stringify(result));
      if (data.data.status == "true") {
        $scope.info = data.data.dados || {};
      } else {
        myPopup = $ionicPopup.show({
          title: '<p class="avaliacao-titulo">Mensagem</p>',
          template: '<p class="avaliacao-pergunta">' + data.data.msg || 'Entre em contato com o administrador do aplicativo.' + '</p>',
          scope: $scope,
          buttons: [
            {
              text: '<b>Ok</b>',
              type: 'popclose',
              onTap: function(e) {
              }
            }
          ]
        });
      }
    }, function (error) {
      $ionicLoading.hide();
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }

      myPopup = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">Mensagem</p>',
        template: '<p class="avaliacao-pergunta">' + msg + '</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
            }
          }
        ]
      });
    });
  };

  var init = function() {
    $scope.getHistoriaCidade();
  }

  init();

}])

.controller('numerosImportantesCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', '$ionicLoading', '$http', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicPopup, $ionicLoading, $http, $timeout) {

  $scope.info = {};

  $scope.goTo = function(opcao){
    if (opcao == 'cidade') { $state.go("cidade"); }
  }

  $scope.getDadosGerais = function() {
    $ionicLoading.show();
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/getDadosGerais";
    //var url = "http://vetorello.com.br/conecta_cb/public/getDadosGerais";
    $http({
      method : "GET",
      url: url,
      params : {}
    }).then(function (result) {
      $ionicLoading.hide();
      var data = JSON.parse(JSON.stringify(result));
      if (data.data.status == "true") {
        $scope.info = data.data.dados || {};
      } else {
        myPopup = $ionicPopup.show({
          title: '<p class="avaliacao-titulo">Mensagem</p>',
          template: '<p class="avaliacao-pergunta">' + data.data.msg || 'Entre em contato com o administrador do aplicativo.' + '</p>',
          scope: $scope,
          buttons: [
            {
              text: '<b>Ok</b>',
              type: 'popclose',
              onTap: function(e) {
              }
            }
          ]
        });
      }
    }, function (error) {
      $ionicLoading.hide();
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }

      myPopup = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">Mensagem</p>',
        template: '<p class="avaliacao-pergunta">' + msg + '</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
            }
          }
        ]
      });
    });
  };

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  var init = function() {
    $scope.getDadosGerais();
  }

  init();
}])

.controller('telefonesUteisCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$ionicPopup', '$ionicLoading', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, $ionicPopup, $ionicLoading, $http) {

  $scope.telefones = [];

  $scope.goTo = function(opcao){
    if (opcao == 'cidade') { $state.go("cidade"); }
  }

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  $scope.listarTelefones = function() {
    $ionicLoading.show();
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/listarTelefones";
    //var url = "http://vetorello.com.br/conecta_cb/public/listarTelefones";
    $http({
      method : "GET",
      url : url,
      params : {}
    }).then(function (result) {
      var data = JSON.parse(JSON.stringify(result));
      if (data.data.status == "true") {
        $ionicLoading.hide();
        $scope.telefones = data.data.dados || [];
      } else {
        $ionicLoading.hide();
        myPopup = $ionicPopup.show({
          title: '<p class="avaliacao-titulo">Mensagem</p>',
          template: '<p class="avaliacao-pergunta">' + data.data.msg || 'Entre em contato com o administrador do aplicativo.' + '</p>',
          scope: $scope,
          buttons: [
            {
              text: '<b>Ok</b>',
              type: 'popclose',
              onTap: function(e) {
              }
            }
          ]
        });
      }
    }, function (error) {
      $ionicLoading.hide();
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }

      myPopup = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">Mensagem</p>',
        template: '<p class="avaliacao-pergunta">' + msg + '</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
            }
          }
        ]
      });
    });
  }

  var init = function() {
    $scope.listarTelefones();
  }

  init();
}])

.controller('visualizarCtrl', ['$scope', '$stateParams', '$state', '$http', '$ionicLoading', '$ionicScrollDelegate', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $http, $ionicLoading, $ionicScrollDelegate, $timeout) {

  $scope.info = {
    inicio : {
      x : 0, 
      y : 0,
      move: null
    },
    page : {
      left : {
        left : 0,
        width : 0
      },
      right : {
        left : 0,
        width : 0
      }
    },
    left : 0    
  };

  $scope.noticia = {};
  
  $scope.congelarScroll = function(opcao, move) {
    $ionicScrollDelegate.freezeScroll(opcao);
    $scope.info.inicio.move = move;
  }

  $scope.calcularLeft = function() {
    let move = Math.trunc(event.gesture.center.pageX) - $scope.info.inicio.x;
    $scope.info.left = move;
    if (move == 0) {
      $scope.setValuePages();
    } else if (move < 0) {
      $scope.info.page.right.left = $scope.info.page.right.width - (move * -1);
      $scope.setValuePageLeft();
    } else {
      $scope.info.page.left.left = ($scope.info.page.left.width - move) * -1;
      $scope.setValuePageRight();
    }
    //console.log("move", move);
    //move = (move < 0) ? move * (-1) : move;
    ////$scope.info.page.left.left = $scope.info.page.left.width + move;
  }

  $scope.onTouch = function(event) {    
    $scope.setValuePages();
    $scope.info.inicio.x = Math.trunc(event.gesture.center.pageX);
    $scope.info.left = 0;
    $scope.info.inicio.move = null;
  }

  $scope.onDragUp = function(event) {
    //console.log("drag-up move", $scope.info.inicio.move);
    if ($scope.info.inicio.move == null) $scope.congelarScroll(false, "up");
  }

  $scope.onDragLeft = function(event) {
    //console.log("drag-left move", $scope.info.inicio.move);
    if ($scope.info.inicio.move == null) $scope.congelarScroll(true, "left");
    if ($scope.info.inicio.move != "up") $scope.calcularLeft();
  }

  $scope.onDragRight = function(event) {
    //console.log("drag-right move", $scope.info.inicio.move);
    if ($scope.info.inicio.move == null) $scope.congelarScroll(true, "right");
    if ($scope.info.inicio.move != "up") $scope.calcularLeft();
  }

  $scope.onRelease = function() {
    console.log('move', $scope.info.inicio.move);
    let direction = $scope.info.inicio.move;
    if ($scope.info.inicio.move != "up") {
      $scope.congelarScroll(false, null);
      let percentual = (100 * $scope.info.left) / window.screen.width;
      percentual = Math.trunc(percentual)
      percentual = (percentual < 0) ? percentual * -1 : percentual;
      if (percentual < 50) {
        $scope.setValuePages();
        $scope.info.left = 0;
      } else {
        let id = null;
        if (direction == "left") {
          if (JSON.stringify($scope.noticia.right) != '[]') {
            id = $scope.noticia.right.id;
          }
        } else if (direction == "right") {
          if (JSON.stringify($scope.noticia.left) != '[]') {
            id = $scope.noticia.left.id;
          }
        }

        if (JSON.stringify(id) == "null") {
          $scope.setValuePages();
        } else {
          $scope.noticia = {};
          $scope.getNoticiasPageVisualizar(id);
          $scope.setValuePages();
        }

        $scope.info.left = 0;

        //console.log("id", JSON.stringify(id));
        //console.log("foi");
        //console.log("noticia", $scope.noticia);
      }
    }
  }

  //$scope.onDrag = function(event) {
  //  //console.log("ondrag x", Math.trunc(event.gesture.center.pageX), $scope.info.inicio.x);
  //  //console.log("ondrag y", Math.trunc(event.gesture.center.pageY), $scope.info.inicio.y);
  //  //moveX = Math.trunc(event.gesture.center.pageX) - $scope.info.inicio.x;
  //  //moveY = Math.trunc(event.gesture.center.pageY) - $scope.info.inicio.y;
  //  //moveX = (moveX < 0) ? moveX * (-1) : moveX;
  //  //moveY = (moveY < 0) ? moveY * (-1) : moveY;
  //  //console.log('moveX', moveX);
  //  //console.log('moveY', moveY);
  //  //console.log('event', event.gesture.startEvent);
  //  //console.log('stopPropagation', event.gesture.stopPropagation());
  //}

  $scope.goTo = function(opcao){
    if (opcao == 'noticias') { $state.go("noticias"); }
  }

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  $scope.setValuePages = function() {
    $scope.setValuePageRight();
    $scope.setValuePageLeft();
  }

  $scope.setValuePageRight = function() {
    $scope.info.page.right.width = window.screen.width;
    $scope.info.page.right.left = window.screen.width;
  }

  $scope.setValuePageLeft = function() {
    $scope.info.page.left.width = window.screen.width;
    $scope.info.page.left.left = window.screen.width * -1;
  }

  $scope.getNoticiasPageVisualizar = function(id) {
    $ionicLoading.show();
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/NoticiasPageVisualizar/" + id;
    $http({
      method : "GET",
      url : url,
      params : {}
    }).then(function (result) {
      var data = JSON.parse(JSON.stringify(result));
      $ionicLoading.hide();
      $scope.noticia = data.data.dados || [];
    }, function (error) {
      $ionicLoading.hide();
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }
    });
  }  

  var init = function() {
    let id = null;
    
    if (typeof $stateParams != "undefined") {
      if (typeof $stateParams.noticia != "undefined") {
        if ($stateParams.noticia != null) {
          if (typeof $stateParams.noticia.id != "undefined") {
            id = $stateParams.noticia.id;
          } 
        }
      } 
    }

    if (localStorage.getItem('noticias') != null) {
      let noticias = JSON.parse(localStorage.getItem('noticias'));
      id = noticias[0].id;
    }

    $scope.getNoticiasPageVisualizar(id);

    $scope.setValuePages();
    
  }

  init();
}])

.controller('cinemaCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$ionicPopup', '$ionicLoading', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, $ionicPopup, $ionicLoading, $http) {

  $scope.info = {};

  $scope.goTo = function(opcao){
    if (opcao == 'cidade') { $state.go("cidade"); }
  }

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  $scope.getInfoCinema = function() {
    $ionicLoading.show();
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/getInfoCinema";
    //var url = "http://vetorello.com.br/conecta_cb/public/getInfoCinema";
    $http({
      method : "GET",
      url: url,
      params : {}
    }).then(function (result) {
      $ionicLoading.hide();
      var data = JSON.parse(JSON.stringify(result));
      if (data.data.status == "true") {
        $scope.info = data.data.dados || {};
      } else {
        myPopup = $ionicPopup.show({
          title: '<p class="avaliacao-titulo">Mensagem</p>',
          template: '<p class="avaliacao-pergunta">' + data.data.msg || 'Entre em contato com o administrador do aplicativo.' + '</p>',
          scope: $scope,
          buttons: [
            {
              text: '<b>Ok</b>',
              type: 'popclose',
              onTap: function(e) {
              }
            }
          ]
        });
      }
    }, function (error) {
      $ionicLoading.hide();
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }

      myPopup = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">Mensagem</p>',
        template: '<p class="avaliacao-pergunta">' + msg + '</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
            }
          }
        ]
      });
    });
  };

  $scope.viewFilme = function(opcao) {
    var filme = $scope.info.filmes[opcao].Filme;
    $state.go('filme', { filme: filme});
  };

  var init = function() {
    $scope.getInfoCinema();
  };

  init();
}])

.controller('filmeCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $timeout, $http) {

  $scope.filme = {};

  $scope.goTo = function(opcao){
    if (opcao == 'cinema') { $state.go("cinema"); }
  }

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  var init = function() {
    $scope.filme = $stateParams;
  }

  init();

}])

.controller('podasCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', '$timeout', '$http', '$ionicLoading',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicPopup, $timeout, $http, $ionicLoading) {

  $scope.dados = []

  $scope.goTo = function(opcao){
    if (opcao == 'cidade') { $state.go("cidade"); }
  }

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  $scope.heightDiv = 0;

  $scope.listarPodas = function() {
    $ionicLoading.show();
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/listarPodas";
    //var url = "http://vetorello.com.br/conecta_cb/public/listarPodas";
    $http({
      method : "GET",
      url: url,
      params : {}
    }).then(function (result) {
      $ionicLoading.hide();
      var data = JSON.parse(JSON.stringify(result));
      if (data.data.status == "true") {
        $scope.dados = data.data.dados || [];
      } else {
        myPopup = $ionicPopup.show({
          title: '<p class="avaliacao-titulo">Mensagem</p>',
          template: '<p class="avaliacao-pergunta">' + data.data.msg || 'Entre em contato com o administrador do aplicativo.' + '</p>',
          scope: $scope,
          buttons: [
            {
              text: '<b>Ok</b>',
              type: 'popclose',
              onTap: function(e) {
              }
            }
          ]
        });
      }
    }, function (error) {
      $ionicLoading.hide();
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }

      myPopup = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">Mensagem</p>',
        template: '<p class="avaliacao-pergunta">' + msg + '</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
            }
          }
        ]
      });
    });
  };

  var init = function() {
    var widthTela = window.innerWidth;
    $scope.heightDiv = parseInt((window.innerWidth * 600 / 1080) + 10);
    $scope.listarPodas();
  }

  init();

}])

.controller('downloadsCtrl', ['$scope', '$stateParams', '$state', '$http', '$ionicPopup', '$ionicLoading', '$timeout', '$cordovaInAppBrowser', '$cordovaFileTransfer', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $http, $ionicPopup, $ionicLoading, $timeout, $cordovaInAppBrowser, $cordovaFileTransfer) {

  $scope.goTo = function(opcao){
    if (opcao == 'cidade') { $state.go("cidade"); }
  }

  $scope.dados = [];

  //$scope.download = function(opcao){
  //  if (opcao == "a") {
  //    window.open(encodeURI('downloads/campo_bom_brasao.pdf'), '_system');
  //  } else if (opcao == "b") {
  //    window.open(encodeURI('downloads/campo_bom_brasao.pdf'), '_system');
  //  } else if (opcao == "c") {
  //    window.open(encodeURI('downloads/campo_bom_brasao_line_art.pdf'), '_system');
  //  } else if (opcao == "d") {
  //    window.open(encodeURI('downloads/campo_bom_hino.mp3'), '_system');
  //  } else if (opcao == "e") {
  //    window.open(encodeURI('downloads/campo_bom_jingle_gestao_2017.mp3'), '_system');
  //  } else if (opcao == "f") {
  //    window.open(encodeURI('downloads/campo_bom_logo_2017.pdf'), '_system');
  //  } else if (opcao == "g") {
  //    window.open(encodeURI('downloads/campo_bom_video_gestao_2017.mp4'), '_system');
  //  }
  //}

  $scope.listarDownloads = function() {
    $ionicLoading.show();
    var url = "http://aplicativo.campobom.rs.gov.br/conecta_cb/public/listarDownloads";
    //var url = "http://vetorello.com.br/conecta_cb/public/listarDownloads";
    $http({
      method : "GET",
      url: url,
      params : {}
    }).then(function (result) {
      $ionicLoading.hide();
      var data = JSON.parse(JSON.stringify(result));
      if (data.data.status == "true") {
        $scope.dados = data.data.dados || [];
      } else {
        myPopup = $ionicPopup.show({
          title: '<p class="avaliacao-titulo">Mensagem</p>',
          template: '<p class="avaliacao-pergunta">' + data.data.msg || 'Entre em contato com o administrador do aplicativo.' + '</p>',
          scope: $scope,
          buttons: [
            {
              text: '<b>Ok</b>',
              type: 'popclose',
              onTap: function(e) {
              }
            }
          ]
        });
      }
    }, function (error) {
      $ionicLoading.hide();
      var msg = error.statusText;
      if (error.status == -1) {
        msg = "Para acessar o conteúdo desse menu é necessário ter conexão com a internet.";
      } else if (error.status == 404) {
        msg = "Conteúdo não encontrado.";
      } else {
        msg = "Entrar em contato com o administrador do aplicativo. Código de erro: " + error.status + ".";
      }

      myPopup = $ionicPopup.show({
        title: '<p class="avaliacao-titulo">Mensagem</p>',
        template: '<p class="avaliacao-pergunta">' + msg + '</p>',
        scope: $scope,
        buttons: [
          {
            text: '<b>Ok</b>',
            type: 'popclose',
            onTap: function(e) {
            }
          }
        ]
      });
    });
  };

  $scope.downloadArquivo = function(opcao) {
    window.open(opcao.imagem, '_system');
  }

  $timeout(function() {
    jQuery("#div-img-principal").hide();
  }, 1);

  var init = function() {
    $scope.listarDownloads();
  }

  init();

}])
