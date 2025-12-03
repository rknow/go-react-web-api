package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"

)

func main() {
	// React build folder
	base, _ := os.Getwd()
	staticDir := filepath.Join(base, "..", "frontend", "build")

	if _, err := os.Stat(staticDir); os.IsNotExist(err) {
		log.Fatal("React build folder not found. Run npm run build in frontend.")
	}

	r := mux.NewRouter()

	// API routes
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/publishers", getPublishers).Methods("GET")
	api.HandleFunc("/publishers", createPublisher).Methods("POST")
	api.HandleFunc("/publishers/{id}", updatePublisher).Methods("PUT")
	api.HandleFunc("/publishers/{id}", deletePublisher).Methods("DELETE")

	// Serve React SPA
	r.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestedPath := filepath.Join(staticDir, r.URL.Path)
		if info, err := os.Stat(requestedPath); err == nil && !info.IsDir() {
			http.ServeFile(w, r, requestedPath)
			return
		}
		http.ServeFile(w, r, filepath.Join(staticDir, "index.html"))
	})

	log.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
