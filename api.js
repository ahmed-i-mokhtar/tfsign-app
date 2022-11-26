import axios from "axios";
import { Alert } from "react-native";

export const uploadReq = async (image) => {
  const uriArray = image.uri.split(".");
  const fileExtension = uriArray[uriArray.length - 1];
  const fileTypeExtended = `${image.type}/${fileExtension}`;
  const file = {
    uri: image.uri,
    name: image.uri.substring(image.uri.lastIndexOf("/") + 1),
    type: fileTypeExtended,
  };
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(
      "http://ec2-13-48-194-49.eu-north-1.compute.amazonaws.com:9000/uploadImageAPI/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response)
    const resBody = response?.data.output;

    return resBody;
  } catch (error) {
    console.log(error);
    Alert.alert(error.toString());
    return null;
  }
};
