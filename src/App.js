import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";


export default function App() {

  const [repositories, setRepositories] = useState([]);
  const [, updateStete] = useState();

  useEffect(() => {
    loadRepositories();
  }, []);

  async function loadRepositories() {
    const response = await api.get("repositories");
    setRepositories(response.data);
  }

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`)
    const likedRepository = response.data;

    const updatedRepositories = repositories.map(repository => {
      if(repository.id === likedRepository.id){
        return likedRepository;
      }else{
        return repository;
      }
    })

    setRepositories(updatedRepositories);
  }

  function renderRepository({ item }) {
    const { id, title, techs, url, likes } = item;

    return (
      <View style={styles.repositoryContainer}>
        <Text style={styles.repository}>{title}</Text>

        <View style={styles.techsContainer}>
          {techs.map(tech => (
            <Text key={tech} style={styles.tech}>
              {tech}
            </Text>
          ))}
        </View>

        <View style={styles.likesContainer}>
          <Text
            style={styles.likeText}
            testID={`repository-likes-${id}`}
          >
            {likes} curtidas
            </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => handleLikeRepository(id)}
          testID={`like-button-${id}`}
        >
          <Text style={styles.buttonText}>Curtir</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          renderItem={renderRepository}
          keyExtractor={repository => repository.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
