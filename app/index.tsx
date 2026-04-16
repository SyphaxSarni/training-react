import { CardTodo } from "@/components/CardTodo/CardTodo";
import { Header } from "@/components/Header/Header";
import { TabBottomMenu } from "@/components/TabBottomMenu/TabBottomMenu";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { s } from "./index.style";

export default function Index() {
  const [selectedTabName, setSelectedTabName] = useState("all");

  const [todoList, setTodoList] = useState([
    { id: 1, title: "Sortir le chien", isCompleted: false },
    { id: 2, title: "Etudier", isCompleted: true },
    { id: 3, title: "Prendre à manger", isCompleted: true },
    { id: 4, title: "Appeler le véto", isCompleted: false },
    { id: 5, title: "Appeler le chien", isCompleted: false },
    { id: 6, title: "Sortir le véto", isCompleted: false },
    { id: 7, title: "Dormir avec le véto", isCompleted: false },
  ]);

  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    const indexToUpdate = todoList.findIndex(
      (todo) => todo.id === updatedTodo.id,
    );

    const updatedTodoList = [...todoList];
    updatedTodoList[indexToUpdate] = updatedTodo;

    setTodoList(updatedTodoList);
  }
  function renderTodoList() {
    return todoList.map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardTodo todo={todo} onPress={updateTodo} />
      </View>
    ));
  }
  const insets = useSafeAreaInsets();
  return (
    <>
      <SafeAreaProvider style={{ flex: 1 }}>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu
          selectedTabName={selectedTabName}
          onPress={setSelectedTabName}
        />
      </View>
    </>
  );
}
