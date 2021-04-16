export const sketch = (_) => {
    let img;
    let file;
    let c;
    let cnv;

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            hasSample = false;
        }

        if (e.code === "KeyS" && (event.ctrlKey || event.metaKey)) {
            e.preventDefault();
            _.save('myCanvas.jpg');
            console.log("Saved!");

        }

    });

    let fileUploader = document.createElement("input");
    fileUploader.type = "file";
    fileUploader.style.position = "fixed";
    fileUploader.style.top = 0;
    fileUploader.style.left = 0;
    document.body.appendChild(fileUploader);

    fileUploader.addEventListener("change", (e) => {
        let src = loadLocal(e.target);
        hasSample = false;
        // console.log(src);

        _.loadImage(src, data => {
                    // _.image(data, 0, 0, _.windowWidth, _.windowHeight);
                    _.background(data);
                    img = data;
                });
    });


    function toBase64(arr) {
        arr = new Uint8Array(arr); //if it's an ArrayBuffer
        return btoa(
            arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    }

    let loadLocal = (input) => {
        let file = input.files[0];
        return URL.createObjectURL(file);
    }

    let readFile = async (input) => {
        let file = input.files[0];

        let reader = new FileReader();

        let src = await URL.createObjectURL(file);
    }

    _.preload = () => {
        img = _.loadImage('https://upload.wikimedia.org/wikipedia/commons/7/73/God2-Sistine_Chapel.png');
    }

    _.setup = () => {
        cnv = _.createCanvas(_.windowWidth, _.windowHeight);
        _.noStroke();

        if (img) {
            _.background(img);
        }
    };

    let startX, startY, endX, endY;
    let hasSample = false;

    _.mousePressed = () => {
        if (!hasSample) {
            startX = _.mouseX;
            startY = _.mouseY;
            console.log(startX,startY,_.mouseX,_.mouseY);
        }
    }

    _.mouseReleased = () => {
        endX = _.mouseX;
        endY = _.mouseY;
        if ((startX !== endX) && (startX !== endX) && !hasSample) {
            getSample()
            hasSample = true;
        }
    }

    function getSample() {
        c = img.get(startX, startY, Math.abs(endX - startX), Math.abs(endY - startY));

        hasSample = true;
    }

    _.mouseDragged = () => {
        if (!hasSample) {
        }
    }

    _.draw = () => {
        if (hasSample && _.mouseIsPressed) {
            _.image(c, _.mouseX, _.mouseY);
        }
    };

    // Windows resize event handling
    _.windowResized = () => {
        _.clear();
        _.resizeCanvas(_.windowWidth, _.windowHeight);
        if (img) {
            _.background(img);
        }
        _.draw();
    }
};
