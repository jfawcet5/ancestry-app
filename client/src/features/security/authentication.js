export function logout() {
    const params = new URLSearchParams({
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        returnTo: window.location.origin + process.env.REACT_APP_PUBLIC_URL
    });

    console.log("returnTo", window.location.origin + process.env.REACT_APP_PUBLIC_URL);

    window.location.href = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/v2/logout?${params}`;
}