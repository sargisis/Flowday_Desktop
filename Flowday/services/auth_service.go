package services

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type AuthService struct {
	ctx    context.Context
	server *http.Server
	config map[string]string // Store firebase config here ideally
}

func NewAuthService() *AuthService {
	return &AuthService{}
}

func (a *AuthService) Startup(ctx context.Context) {
	a.ctx = ctx
}

// CreateGuestSession initializes a session for a user without a cloud account
func (a *AuthService) CreateGuestSession(name string) string {
	fmt.Printf("Guest Login: %s\n", name)
	return fmt.Sprintf("Welcome, %s (Guest)", name)
}

// StartGoogleLogin starts a local server and opens the system browser
func (a *AuthService) StartGoogleLogin() {
	// 1. Start a local HTTP server
	mux := http.NewServeMux()
	mux.HandleFunc("/", a.handleLoginRequest)
	mux.HandleFunc("/callback", a.handleCallback)

	a.server = &http.Server{
		Addr:    ":9876",
		Handler: mux,
	}

	go func() {
		if err := a.server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Printf("Auth server error: %s\n", err)
		}
	}()

	// 2. Open the browser to localhost:9876
	runtime.BrowserOpenURL(a.ctx, "http://localhost:9876")
}

func (a *AuthService) handleLoginRequest(w http.ResponseWriter, r *http.Request) {
	// Serve the HTML page with Firebase SDK
	// Using the keys user provided earlier
	html := `
	<!DOCTYPE html>
	<html>
	<head>
		<title>Flowday Login</title>
		<style>
			body { background: #000; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
			.btn { background: #fff; color: #000; padding: 10px 20px; border-radius: 5px; cursor: pointer; border: none; font-weight: bold; }
		</style>
	</head>
	<body>
		<h1>Flowday ID</h1>
		<p>Please sign in to continue.</p>
		<button class="btn" onclick="signIn()">Sign in with Google</button>
		
		<script type="module">
		  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
		  import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

		  const firebaseConfig = {
			apiKey: "AIzaSyD0f4YxmW3O82_efX-FNvOzobwMMN4A2j0",
			authDomain: "flowday-com.firebaseapp.com",
			projectId: "flowday-com",
			storageBucket: "flowday-com.firebasestorage.app",
			messagingSenderId: "735118858084",
			appId: "1:735118858084:web:dbb3af01a8e73c5bca8c71",
			measurementId: "G-N0XS7FTXMM"
		  };

		  const app = initializeApp(firebaseConfig);
		  const auth = getAuth(app);
		  const provider = new GoogleAuthProvider();

		  window.signIn = () => {
			signInWithPopup(auth, provider).then((result) => {
				const user = result.user;
				user.getIdToken().then(token => {
					// Send token back to local server
					fetch('/callback', {
						method: 'POST',
						body: JSON.stringify({ token: token, name: user.displayName, email: user.email })
					}).then(() => {
						document.body.innerHTML = "<h1>Success!</h1><p>You can close this tab now.</p>";
					});
				});
			}).catch((error) => {
				console.error(error);
				alert("Login failed: " + error.message);
			});
		  };
		  
		  // Auto-trigger if simple
		  // signIn();
		</script>
	</body>
	</html>
	`
	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte(html))
}

func (a *AuthService) handleCallback(w http.ResponseWriter, r *http.Request) {
	// Receive token
	// Parse JSON body (omitted for brevity, just treating as signal)
	fmt.Println("Received callback from browser!")

	// Emit event to Wails frontend
	runtime.EventsEmit(a.ctx, "auth-success", map[string]string{"name": "Google User"}) // Mock data for now

	w.Write([]byte("OK"))

	// Stop server after a delay
	go func() {
		time.Sleep(1 * time.Second)
		a.server.Shutdown(context.Background())
	}()
}
