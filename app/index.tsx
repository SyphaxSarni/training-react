import { ButtonAdd } from "@/components/ButtonAdd/ButtonAdd";
import { CardTodo } from "@/components/CardTodo/CardTodo";
import { Header } from "@/components/Header/Header";
import { TabBottomMenu } from "@/components/TabBottomMenu/TabBottomMenu";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import Dialog from "react-native-dialog";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import { s } from "./index.style";

export default function Index() {
  const [selectedTabName, setSelectedTabName] = useState("all");

  const [todoList, setTodoList] = useState([]);

  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);

  const [inputValue, setInputValue] = useState("");

  function getFilteredList() {
    switch (selectedTabName) {
      case "inProgress":
        return todoList.filter((todo) => {
          return !todo.isCompleted;
        });
      case "done":
        return todoList.filter((todo) => {
          return todo.isCompleted;
        });
      default:
        return todoList;
    }
  }

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

  function deleteTodo(todoToDelete) {
    Alert.alert("Suppression", "Supprimer cette tâche ?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== todoToDelete.id));
        },
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardTodo todo={todo} onPress={updateTodo} onLongPress={deleteTodo} />
      </View>
    ));
  }

  function showAddDialog() {
    setIsAddDialogVisible(true);
  }

  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogVisible(false);
    setInputValue("");
  }
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
          <ButtonAdd onPress={showAddDialog} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu
          todoList={todoList}
          selectedTabName={selectedTabName}
          onPress={setSelectedTabName}
        />
      </View>
      <Dialog.Container
        visible={isAddDialogVisible}
        onBackdropPress={() => {
          setIsAddDialogVisible(false);
          setInputValue("");
        }}
      >
        <Dialog.Title>Créer une tâche</Dialog.Title>
        <Dialog.Description>
          Choisi un nom pour la nouvelle tâche
        </Dialog.Description>
        <Dialog.Input onChangeText={setInputValue}></Dialog.Input>
        <Dialog.Button
          disabled={inputValue.trim().length === 0}
          label="Créer"
          onPress={addTodo}
        />
      </Dialog.Container>
    </>
  );
}
