import { Image, Text } from "react-native";
import HeaderLogo from "../../assets/images/logo.png";
import { s } from "./Header.style";

export function Header() {
  return (
    <>
      <Image style={s.img} source={HeaderLogo} resizeMode="contain" />
      <Text style={s.subtitle}>Tu as probablement une chose à faire</Text>
    </>
  );
}
