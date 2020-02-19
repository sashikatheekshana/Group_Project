// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB-eRxME7cVnmsOkD5fJ1NCC3wVV48Uzss",
    authDomain: "jamboree-official.firebaseapp.com",
    databaseURL: "https://jamboree-official.firebaseio.com",
    projectId: "jamboree-official",
    storageBucket: "jamboree-official.appspot.com",
    messagingSenderId: "756586043290",
    appId: "1:756586043290:web:3a2a1d1f934efeb0c58c23",
    measurementId: "G-CP203NKPVT"
  },
  algolia: {
    appId: "7417ZEQGC5",
    apiKey: "bdfd22d8f11adc455b2b5869da134fd9"
  }
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
