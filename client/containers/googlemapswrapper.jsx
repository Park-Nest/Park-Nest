import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      console.log('googlemapswrapper loading')
    case Status.FAILURE:
      console.log('googlemapswrapper render error')
    case Status.SUCCESS:
      console.log('googlemapswrapper was successful')
  }
};

const MyApp = () => <Wrapper apiKey={process.env.GOOGLE_API} render={render} />;

export default MyApp;