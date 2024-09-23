// Use this code in your login form or wherever the session is established
export function setLocalSessionToken(sessionToken: string) {
    if (typeof window !== 'undefined') {
        // Store the session token in localStorage (or sessionStorage for session-based)
        localStorage.setItem('sessionToken', sessionToken);
    }
}

export function getLocalSessionToken() {
    if (typeof window !== 'undefined') {
        // Retrieve the token from localStorage
        return localStorage.getItem('sessionToken');
    }
    return null;
}