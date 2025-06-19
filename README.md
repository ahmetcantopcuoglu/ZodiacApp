# ZodiacApp - Burç Uygulaması ve Backend API

Bu proje, kullanıcıların burç uyumu, burç yorumları ve blog yazılarına erişebildiği mobil bir burç uygulamasıdır. Uygulama, **JWT** ile güvenliği sağlanmış **Node.js** tabanlı bir **REST API** ile **React Native** ve **Expo** kullanılarak geliştirilmiştir.

---

## 🚀 Özellikler

### Backend API (Node.js & Express)

* **Kullanıcı Kayıt & Giriş:** JWT (JSON Web Token) tabanlı kimlik doğrulama.
* **Burç Yorumları:** Günlük, haftalık, aylık ve yıllık burç yorumlarına erişim.
* **Blog Yönetimi:** Blog yazıları oluşturma, listeleme ve beğenme.
* **Kullanıcı Yönetimi:** Kullanıcı adı ve şifre değiştirme.
* **API Loglama:** `Logger Middleware` ile API isteklerinin loglanması.
* **Input Validasyonları:** `express-validator` ile güvenli ve doğru veri girişi.
* **Veri Yönetimi:** **MongoDB** ve **Mongoose** ile veritabanı işlemleri.

### Mobil Uygulama (React Native & Expo)

* **Günlük Burç Yorumları:** Anlaşılır ve güncel burç yorumları.
* **Kullanıcı Dostu Arayüz:** Akıcı ve sezgisel bir kullanıcı deneyimi.
* **Kolay Gezinme:** `React Navigation` ile uygulama içinde sorunsuz geçişler.
* **Hızlı Geliştirme:** `Expo` sayesinde hızlı geliştirme ve test imkanı.

---

## 🛠️ Teknolojiler

* **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, express-validator.
* **Mobil:** React Native, Expo, React Navigation.

---

## 📦 Kurulum

### Backend API

1.  Depoyu klonlayın:
    ```bash
    git clone [https://github.com/ahmetcantopcuoglu/zodiacBackend-api.git](https://github.com/ahmetcantopcuoglu/zodiacBackend-api.git)
    ```
2.  Dizinine gidin:
    ```bash
    cd zodiacBackend-api
    ```
3.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```
4.  `.env.example` dosyasını `.env` olarak kopyalayın ve gerekli alanları (MONGO_URI, JWT_SECRET, PORT) doldurun:
    ```bash
    cp .env.example .env
    ```
5.  Sunucuyu başlatın:
    ```bash
    npm start
    ```

### Mobil Uygulama

1.  Depoyu klonlayın:
    ```bash
    git clone [https://github.com/ahmetcantopcuoglu/ZodiacApp.git](https://github.com/ahmetcantopcuoglu/ZodiacApp.git)
    ```
2.  Uygulama dizinine gidin:
    ```bash
    cd ZodiacApp/ZODIACAPP-app
    ```
3.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```
4.  Uygulamayı başlatın:
    ```bash
    npx expo start
    ```
    Ardından, Expo Go uygulamasını kullanarak terminalde gösterilen QR kodu tarayarak uygulamayı telefonunuzda test edebilirsiniz.

---

## 📮 API Endpoint'leri (Öne Çıkanlar)

### Auth

* `POST /api/auth/register` – Yeni kullanıcı kaydı.
* `POST /api/auth/login` – Kullanıcı girişi (başarılı giriş sonrası JWT token döner).

### Kullanıcı

* `PUT /api/user/updateinfo` – Kullanıcı bilgilerini güncelleme.
* `PUT /api/user/changepassword` – Şifre değiştirme.

### Blog

* `GET /api/blogs` – Tüm blog yazılarını listeleme.
* `POST /api/blogs` – Yeni blog yazısı oluşturma (Token gereklidir).
* `POST /api/blogs/:id/like` – Belirli bir blog yazısını beğenme (Token gereklidir).

### Burçlar

* `GET /api/zodiacs` – Tüm burçları listeleme.
* `GET /api/zodiacs/:id/comments` – Belirli bir burcun yorumlarını getirme.

---

## 🧑‍💻 Geliştirici

**Ahmetcan Topçuoğlu**

* [GitHub Profilim](https://github.com/ahmetcantopcuoglu)
