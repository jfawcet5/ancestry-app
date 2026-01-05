const LOADER_DELAY = process.env.REACT_APP_LOADER_DELAY;
const MIN_LOADER_DISPLAY = process.env.REACT_APP_MIN_LOADER_DISPLAY;


export function createLoader(setLoading, setTitle, setMessage) {
    function executeWithLoader(asyncOperation, title=null, message="") {
        let loaderStartTime = 0;

        const loaderDelay = setTimeout(() => {
            setTitle(title);
            setMessage(message);
            setLoading(true);
            loaderStartTime = Date.now();
        }, LOADER_DELAY);

        return new Promise((resolve, reject) => {
            asyncOperation().then(result => {
                clearTimeout(loaderDelay);
                const elapsedTime = Date.now() - loaderStartTime;
                console.log("Elapsed: ", elapsedTime);
                const remaining = Math.max(0, MIN_LOADER_DISPLAY - elapsedTime);
                
                setTimeout(() => {
                    setLoading(false);
                    setTitle(null);
                    setMessage("");
                    resolve(result);
                }, remaining);
            });
        })
    }

    return executeWithLoader;
}

/*
export function createLoader(setLoading) {
    function executeWithLoader(asyncOperation) {
        let loaderStartTime = 0;

        const loaderDelay = setTimeout(() => {
            setLoading(true);
            loaderStartTime = Date.now();
        }, LOADER_DELAY);

        return asyncOperation().then(result => {
            clearTimeout(loaderDelay);
            const elapsedTime = Date.now() - loaderStartTime;
            console.log("Elapsed: ", elapsedTime);
            const remaining = Math.max(0, MIN_LOADER_DISPLAY - elapsedTime);
            
            setTimeout(() => {
                setLoading(false);
                return result;
            }, remaining);
        });
    }

    return executeWithLoader;
}
    */