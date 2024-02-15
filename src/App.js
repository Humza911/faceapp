import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Facerecognition from './components/Facerecognition/Facerecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState} from "react";
import { loadSlim } from "@tsparticles/slim";
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
//import Clarifai from 'clarifai';

 
const App = () => {
  const [init, setInit] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [signIn, setSignIn] = useState(false);
  const [userProfile, setuserProfile] = useState(
    {
      Id: "",
      name: "",
      email: "",
      entries: "",
      joined: "",
    }
  );

  const initialState = () =>
  {
    setInputUrl('');
    setImageUrl('');
    setBoxes([]);
    setSignIn(false);
    setuserProfile({id:"", name: "", email: "", entries: "",joined: "",} )
  }
  
//Connection with server

useEffect(()=>{
  const fetchData = async () =>{
    const response = await fetch('https://myfaceappbe.onrender.com')
    //const data = await response.json();
  }
  fetchData();
}, []);

// this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {    
      await loadSlim(engine);      ;
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    //console.log(container);
  };

  const options = useMemo(
    () => ({
      // background: {
      //   color: {
      //     value: "#0d47a1",
      //   },
      // },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 5,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 300,
          value_area: 800,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );


const onInputChange = (event) =>
  {
    setInputUrl(event.target.value);   
  }

  const onSubmit = () => {
    if (inputUrl.trim() === '') {
      console.log('URL is empty');
      return;
    } 
    setImageUrl(inputUrl);

    const imageUrlentry = {
      method: 'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
          imageUrl : inputUrl
      })
    }  

    fetch('https://myfaceappbe.onrender.com/imageurl', imageUrlentry)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => {
      const regions = result.outputs[0].data.regions;
      const faceBoxes = regions.map(region=>region.region_info.bounding_box)
      regions.forEach(region => {
        const boundingBox = region.region_info.bounding_box;
        const topRow = boundingBox.top_row.toFixed(3);
        const leftCol = boundingBox.left_col.toFixed(3);
        const bottomRow = boundingBox.bottom_row.toFixed(3);
        const rightCol = boundingBox.right_col.toFixed(3);
        region.data.concepts.forEach(concept => {
          const name = concept.name;
          const value = concept.value.toFixed(4);

          //console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
        });
      });
      
      const imageEntry = {
        method: 'put',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            Id : userProfile.Id,  
        })
      }  
      fetch('https://myfaceappbe.onrender.com/image',imageEntry).then(response => response.json()
      .then(entrycount => {Object.assign(userProfile,{entries: entrycount});        
      setBoxes(faceBoxes);
      })).catch(error => console.error('Error:', error));
    })    
    .catch(error => console.error('Error:', error));
    
    
    
    
    
    // fetch('http://localhost:3000/imageurl',imageUrlentry)
    //   .then(result => {
    //     const regions = result.outputs[0].data.regions;
    //     const faceBoxes = regions.map(region=>region.region_info.bounding_box)
    //     regions.forEach(region => {
    //       const boundingBox = region.region_info.bounding_box;
    //       const topRow = boundingBox.top_row.toFixed(3);
    //       const leftCol = boundingBox.left_col.toFixed(3);
    //       const bottomRow = boundingBox.bottom_row.toFixed(3);
    //       const rightCol = boundingBox.right_col.toFixed(3);
    //       region.data.concepts.forEach(concept => {
    //         const name = concept.name;
    //         const value = concept.value.toFixed(4);
  
    //         //console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
    //       });
    //     });
        
    //     const imageEntry = {
    //       method: 'put',
    //       headers:{'Content-Type':'application/json'},
    //       body: JSON.stringify({
    //           Id : userProfile.Id,  
    //       })
    //     }  
    //     fetch('http://localhost:3000/image',imageEntry).then(response => response.json()
    //     .then(entrycount => {Object.assign(userProfile,{entries: entrycount});
    //     setImageUrl(inputUrl);        
    //     setBoxes(faceBoxes);
    //     })).catch(error => console.error('Error:', error));
    //   })    
    //   .catch(error => console.error('Error:', error));
  };

//   const raw = JSON.stringify({
//     "user_app_id": {
//         "user_id": USER_ID,
//         "app_id": APP_ID
//     },
//     "inputs": [
//         {
//             "data": {
//                 "image": {
//                     "url": imageUrl
//                     // "base64": IMAGE_BYTES_STRING
//                 }
//             }
//         }
//     ]
// });

// const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Key ' + PAT
//     },
//     body: raw
// };

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id
//

//Routing

const onRouteChange = (route) =>
{
  if(route==='signin'){
    setSignIn(false)
  }
  else if(route==='home'){
    setSignIn(true)
        
  }  
  setRoute(route);
}

const loadUser = (data) => {
  setuserProfile({
    Id: data.Id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined,}
  );
};  

  return (
      <div className="App">
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
          <Navigation onRouteChange={onRouteChange} signIn={signIn} initialState={initialState}/>
          
          { route==='home'?
            <>
            <Logo/>
            <Rank username = {userProfile.name} userrank = {userProfile.entries}/> 
            <ImageLinkForm onInputChange = {onInputChange} onSubmit={onSubmit}/>
            <Facerecognition imageUrl={imageUrl} boxes={boxes}/>
            </>            
            : (route==='signin')?            
            <Signin onRouteChange={onRouteChange} setSignIn={signIn} loadUser={loadUser}/>
            : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>            
          }
      </div>
  );
}

export default App;
