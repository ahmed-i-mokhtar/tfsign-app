import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";

export default function ResultScreen({ navigation, route }) {
  const { uri, res } = route?.params;
  const [params, setParams] = useState({})
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 })
  const [selected, setSelected] = useState({})

  useEffect(() => {
    Image.getSize(uri, (width, height) => { setImageSize({ width: width, height: height }) });
    console.log(res)
    if(res){
      setSelected(res[0])
    }

  }, [])

  return (
    <View style={styles.container}>

      <Image source={{ uri }} style={styles.image} />
      {
        res ?
          res.map((object) =>

            <TouchableOpacity

              key={object.label}
              style={{
                backgroundColor: selected == object ? "#AA000088" : "#00AA0088",
                borderRadius: 5,
                borderColor: "black",
                position: "absolute",
                left: object.coords[0] / imageSize.width * Dimensions.get("screen").width,
                top: object.coords[1] / imageSize.height * (Dimensions.get("screen").height / 2),
                width: object.coords[2] / imageSize.width * Dimensions.get("screen").width,
                height: object.coords[3] / imageSize.height * (Dimensions.get("screen").height / 2),
              }}
              onPress={() => {
                setSelected(object)
              }}
            >

            </TouchableOpacity>

          ) : <View />
      }
      {
        selected ?
          <View style={{ width: "100%", height: (Dimensions.get("screen").height / 2), position: "absolute", top: (Dimensions.get("screen").height / 2) + 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 25, fontFamily: 'Cochin', textAlign: "center" }}>
              {selected.label}
            </Text>


            <View style={{ width: "95%", height: "60%", backgroundColor: "#3792cbAA", alignSelf: "center", marginTop: 20, borderRadius: 10, alignItems:"center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18, alignSelf: "center", fontFamily: 'Cochin', marginTop: 20 }}>
                Description
              </Text>


              <ScrollView >
                <Text style={{textAlign:"center", fontFamily: 'Cochin', marginTop: 20}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </Text>
              </ScrollView>

            </View>
          </View>
          :  <View style={{ width: "100%", height: (Dimensions.get("screen").height / 2), position: "absolute", top: (Dimensions.get("screen").height / 2) + 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 25, fontFamily: 'Cochin', textAlign: "center" }}>
              No signs detected
          </Text>
        </View>
      }



      {/* {
        res.map(sign => (
      <Text style={styles.description}>
        {sign.label}
      </Text>
          
        ))
      } */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

  },
  imageWrapper: {
    height: "100%",
    width: "100%"
  },
  image: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("screen").width,
    height: (Dimensions.get("screen").height / 2),

    resizeMode: "stretch"
  },
  description: {
    marginTop: 50,
    fontSize: 16,
  },
});
