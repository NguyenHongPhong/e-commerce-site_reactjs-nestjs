import { useEffect, useState } from "react";


// Đây là hook để kiểm tra liệu user có đang active trên trang web hay không
export function useIdle(timeout: number = 5 * 60 * 1000) {
    const [isIdle, setIsIdle] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        //Nếu người dùng active thì idle sẽ là false còn ngược lại sẽ là true 
        // Mỗi khi người dùng tương tác với trang web tương đương với sự kiện đã đăng ký
        //Hàm này sẽ được gọi sẽ set trạng thái của người dùng có active hay không
        const reset = () => {
            setIsIdle(false);
            clearTimeout(timer);
            // Tương đương với thời gian token hết hạn, nếu user không tương tác thì chắc
            // chắn idle sẽ là true
            timer = setTimeout(() => setIsIdle(true), timeout);
        };

        // Danh sách các sự kiện user sẽ thực thi khi sử dụng trang web
        const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "focus"];

        events.forEach((e) => window.addEventListener(e, reset));

        reset();

        return () => {
            events.forEach((e) => window.removeEventListener(e, reset));
            clearTimeout(timer);
        };
    }, [timeout]);

    return isIdle;
}
