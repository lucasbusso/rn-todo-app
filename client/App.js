import { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import TaskComponent from "./components/TaskComponent";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(`http://192.168.0.31:8080/todos/2`);
    const data = await response.json();
    setTodos(data);
  }

  function clearTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            data={todos}
            keyExtractor={(todos) => todos.id}
            ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
            renderItem={({ item }) => (
              <TaskComponent
                {...item}
                toggleTodo={toggleTodo}
                clearTodo={clearTodo}
              />
            )}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </SafeAreaView>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF",
    paddingTop: 24,
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  },
});
