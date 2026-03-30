import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { CheckBox, Input, Button } from '@rneui/themed';

export default function HomeScreen() {
  // we need some initial tasks to show up right away, so let's set up our state 
  // with a few default items. each needs a unique key, description, and completion status.
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Read the React Native documentation', completed: false },
    { key: '2', description: 'Build the Todo App', completed: false },
    { key: '3', description: 'Publish to GitHub Pages', completed: false },
  ]);

  // this state just keeps track of whatever the user is currently typing in the input box
  const [inputText, setInputText] = useState('');

  // here is how we actually add a new task to the list when the button is pressed
  const addTask = () => {
    // we don't want to add a bunch of blank tasks, so we stop here if the input is empty
    if (inputText.trim() === '') return; 

    const newTask = {
      key: Date.now().toString(), // quick way to generate a unique ID using the current time
      description: inputText,
      completed: false,
    };

    // take all the existing tasks, and tack our new one onto the end of the list
    setTasks([...tasks, newTask]);
    
    // clear out the input field so it's ready for the next task
    setInputText('');
  };

  // this flips a specific task between "done" and "not done" based on its unique key
  const toggleComplete = (taskKey) => {
    const updatedTasks = tasks.map((task) => {
      // when we find the right task, flip its completed boolean
      if (task.key === taskKey) {
        return { ...task, completed: !task.completed };
      }
      return task; // leave the other tasks alone
    });
    setTasks(updatedTasks);
  };

  // this tells the FlatList exactly how to draw each individual task on the screen.
  // if the task is marked as completed, we apply a strikethrough style to the text.
  const renderItem = ({ item }) => (
    <CheckBox
      title={item.description}
      checked={item.completed}
      onPress={() => toggleComplete(item.key)}
      textStyle={
        item.completed 
          ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'gray' } 
          : {}
      }
      containerStyle={styles.checkboxContainer}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* the top section where the user types and submits new tasks */}
      <View style={styles.inputRow}>
        <View style={{ flex: 1 }}>
          <Input
            placeholder="Add a new task..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={addTask} // lets the user just hit 'Enter' on their keyboard
          />
        </View>
        <Button 
          title="Add" 
          onPress={addTask} 
          buttonStyle={styles.addButton}
        />
      </View>

      {/* the main list component that efficiently scrolls through all our tasks */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={styles.list}
      />

    </SafeAreaView>
  );
}

// all of our visual styling to make the app look clean and modern
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8', // soft, modern light-gray background
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 5,
    // adds a subtle drop shadow to the input area so it pops off the background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  addButton: {
    backgroundColor: '#6c5ce7', // a sleek purple instead of the default generic blue
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
  },
  list: {
    flex: 1,
  },
  checkboxContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 0,
    margin: 0,
    marginBottom: 12, // gives the tasks some breathing room
    padding: 15,
    // gives each task a floating card effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  }
});