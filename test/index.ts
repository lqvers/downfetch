import download from '../src/'

download({ platform: 'soundcloud', url: 'https://soundcloud.com/thuaggsdiary/backitup' }).then(x => console.log(x))