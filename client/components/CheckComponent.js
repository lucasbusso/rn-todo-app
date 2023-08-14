import { Pressable, StyleSheet } from "react-native";

export default function CheckComponent({ id, completed, toggleTodo }) {
  async function toggle() {
    const response = await fetch(`http://192.168.0.31:8080/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        value: completed ? false : true,
      }),
    });
    const data = await response.json();
    toggleTodo(id);
  }

  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.checkMark,
        { backgroundColor: completed === 0 ? "#0ea5e9" : "#e9e9ef" },
      ]}
    ></Pressable>
  );
}

const styles = StyleSheet.create({
  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 7,
  },
});
