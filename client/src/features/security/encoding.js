export function Base64Encode(str) {
    return btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "-")
        .replace(/=/g, "");
}

export function GenerateCodeVerifier() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Base64Encode(String.fromCharCode(...array));
}

export function CreateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);

    return window.crypto.subtle.digest("SHA-256", data)
    .then(hashBuffer => {
        const bytes = new Uint8Array(hashBuffer);
        const hashed = String.fromCharCode.apply(null, bytes);

        const challenge = Base64Encode(hashed);
        return challenge;
    })
}