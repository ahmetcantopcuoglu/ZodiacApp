import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Button, Alert, TouchableOpacity, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likeLoadingIds, setLikeLoadingIds] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [userToken, setUserToken] = useState(null); // Token burada saklanacak

  // AsyncStorage'dan token'ı al
  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
      } else {
        Alert.alert("Hata", "Kullanıcı girişi yapılmamış.");
      }
    } catch (err) {
      Alert.alert("Hata", "Token alınamadı.");
    }
  };

  async function fetchBlogs() {
    if (!userToken) return; // Token yoksa API çağrısı yapma

    setLoading(true);
    try {
      const res = await fetch("http://192.168.1.2:3000/api/blogs", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Bloglar alınamadı");
      }

      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      Alert.alert("Hata", err.message);
    } finally {
      setLoading(false);
    }
  }

  async function likeBlog(blogId) {
    if (!userToken) {
      Alert.alert("Hata", "Kullanıcı girişi yapılmamış.");
      return;
    }
    if (likeLoadingIds.includes(blogId)) return;

    setLikeLoadingIds((prev) => [...prev, blogId]);

    try {
      const res = await fetch(`http://192.168.1.2:3000/api/blogs/${blogId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Beğenme işlemi başarısız");
      }

      setBlogs((prevBlogs) =>
        prevBlogs.map((b) =>
          b._id === blogId ? { ...b, likes: [...b.likes, "dummyUserId"] } : b
        )
      );

      Alert.alert("Başarılı", data.msg);
    } catch (err) {
      Alert.alert("Hata", err.message);
    } finally {
      setLikeLoadingIds((prev) => prev.filter((id) => id !== blogId));
    }
  }

  async function createBlog() {
    if (!userToken) {
      Alert.alert("Hata", "Kullanıcı girişi yapılmamış.");
      return;
    }
    if (!title.trim() || content.trim().length < 10) {
      Alert.alert("Hata", "Başlık boş olamaz ve içerik en az 10 karakter olmalı");
      return;
    }

    setPosting(true);
    try {
      const res = await fetch("http://192.168.1.2:3000/api/blogs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          Alert.alert("Hata", data.errors.map(e => e.msg).join("\n"));
        } else {
          Alert.alert("Hata", data.msg || "Blog oluşturulamadı");
        }
        return;
      }

      Alert.alert("Başarılı", "Blog oluşturuldu");
      setTitle("");
      setContent("");
      fetchBlogs();
    } catch (err) {
      Alert.alert("Hata", err.message);
    } finally {
      setPosting(false);
    }
  }

  useEffect(() => {
    loadToken();
  }, []);

  useEffect(() => {
    if (userToken) {
      fetchBlogs();
    }
  }, [userToken]);

  if (loading) return <ActivityIndicator size="large" color="#000" style={{ flex: 1, justifyContent: "center" }} />;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <View style={{ marginBottom: 20, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 15 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>Yeni Blog Oluştur</Text>
            <TextInput
              placeholder="Başlık"
              value={title}
              onChangeText={setTitle}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 8,
                marginBottom: 10,
              }}
            />
            <TextInput
              placeholder="İçerik (en az 10 karakter)"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={4}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 8,
                marginBottom: 10,
                textAlignVertical: "top",
              }}
            />
            <Button title={posting ? "Gönderiliyor..." : "Gönder"} onPress={createBlog} disabled={posting} />
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              marginBottom: 10,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: "#ccc",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.title}</Text>
            <Text style={{ marginVertical: 5 }}>{item.content}</Text>
            <Text style={{ fontStyle: "italic", marginBottom: 10 }}>
              Yazar: {item.author?.name || "Bilinmiyor"}
            </Text>

            <TouchableOpacity
              disabled={likeLoadingIds.includes(item._id)}
              onPress={() => likeBlog(item._id)}
              style={{
                backgroundColor: likeLoadingIds.includes(item._id) ? "#aaa" : "#007BFF",
                paddingVertical: 8,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>
                Beğen ({item.likes ? item.likes.length : 0})
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Henüz blog yok.</Text>}
        ListFooterComponent={<Button title="Yenile" onPress={fetchBlogs} />}
      />
    </View>
  );
}
