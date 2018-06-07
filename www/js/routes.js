angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



  .state('principal', {
    url: '/principal',
    templateUrl: 'templates/principal.html',
    controller: 'principalCtrl'
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('ajuda', {
    url: '/ajuda',
    templateUrl: 'templates/ajuda.html',
    controller: 'ajudaCtrl'
  })

  .state('sobre', {
    url: '/sobre',
    templateUrl: 'templates/sobre.html',
    controller: 'sobreCtrl'
  })

  .state('suaVoz', {
    url: '/suaVoz',
    templateUrl: 'templates/suaVoz.html',
    controller: 'suaVozCtrl'
  })

  .state('demanda', {
    url: '/demanda',
    templateUrl: 'templates/demanda.html',
    controller: 'demandaCtrl'
  })

  .state('noticias', {
    url: '/noticias',
    params: {
        menu: null
    },
    templateUrl: 'templates/noticias.html',
    controller: 'noticiasCtrl'
  })

  .state('deuCerto', {
    url: '/deuCerto',
    templateUrl: 'templates/deuCerto.html',
    controller: 'deuCertoCtrl'
  })

  .state('empregos', {
    url: '/empregos',
    templateUrl: 'templates/empregos.html',
    controller: 'empregosCtrl'
  })

  .state('prefeitura', {
    url: '/prefeitura',
    templateUrl: 'templates/prefeitura.html',
    controller: 'prefeituraCtrl'
  })

  .state('cidade', {
    url: '/cidade',
    templateUrl: 'templates/cidade.html',
    controller: 'cidadeCtrl'
  })

  .state('cadastrar', {
    url: '/cadastrar',
    templateUrl: 'templates/cadastrar.html',
    controller: 'cadastrarCtrl'
  })

  .state('simbolos', {
    url: '/simbolos',
    templateUrl: 'templates/simbolos.html',
    controller: 'simbolosCtrl'
  })

  .state('historia', {
    url: '/historia',
    templateUrl: 'templates/historia.html',
    controller: 'historiaCtrl'
  })

  .state('numerosImportantes', {
    url: '/numerosImportantes',
    templateUrl: 'templates/numerosImportantes.html',
    controller: 'numerosImportantesCtrl'
  })

  .state('telefonesUteis', {
    url: '/telefonesUteis',
    templateUrl: 'templates/telefonesUteis.html',
    controller: 'telefonesUteisCtrl'
  })

  .state('downloads', {
    url: '/downloads',
    templateUrl: 'templates/downloads.html',
    controller: 'downloadsCtrl'
  })

  .state('cinema', {
    url: '/cinema',
    templateUrl: 'templates/cinema.html',
    controller: 'cinemaCtrl'
  })

  .state('avaliacao', {
    url: '/avaliacao',
    templateUrl: 'templates/avaliacao.html',
    controller: 'avaliacaoCtrl'
  })

  .state('visualizar', {
    url: '/visualizar',
    params: {
        noticia: null
    },
    templateUrl: 'templates/visualizar.html',
    controller: 'visualizarCtrl'
  })

  .state('filme', {
    url: '/filme',
    params: {
        filme: null
    },
    templateUrl: 'templates/filme.html',
    controller: 'filmeCtrl'
  })

  .state('podas', {
    url: '/podas',
    templateUrl: 'templates/podas.html',
    controller: 'podasCtrl'
  })

$urlRouterProvider.otherwise('/menu')

});