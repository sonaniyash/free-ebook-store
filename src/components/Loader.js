import React from 'react';
import AnimatedLoader from "react-native-animated-loader";

function Loader(props){
    return (
        <AnimatedLoader
            visible={props.loading}
            overlayColor="rgba(66,103,178,0.01)"
            source={require("./book.json")}
            speed={1}
        />
    );
}

export default Loader;
