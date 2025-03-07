export default function useCookies() {

    const getCookies = () => {
        const cookieString = document.cookie;
        const cookieArray = cookieString.split(';').map(cookie => cookie.trim());
        return cookieArray
    };
    const cleanCookies = () => {
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            const [session_id] = cookie.split('=');
            document.cookie = `${session_id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
    };

    return { getCookies, cleanCookies };
}
