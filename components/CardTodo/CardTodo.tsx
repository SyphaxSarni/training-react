import { Image, Text, TouchableOpacity } from "react-native";
import CheckImage from "../../assets/images/check.png";

import { s } from "./CardTodo.style";
export function CardTodo({ todo, onPress, onLongPress }) {
  return (
    <TouchableOpacity
      onLongPress={() => onLongPress(todo)}
      style={s.card}
      onPress={() => onPress(todo)}
    >
      <Text
        style={[
          s.text,
          todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      {todo.isCompleted && <Image style={s.img} source={CheckImage} />}
    </TouchableOpacity>
  );
}
