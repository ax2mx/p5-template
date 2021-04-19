export const sketch = (_) => {
    let img, imgSrc, file;
    let aspect;

    let x, y, w, h;
    let selection;
    let drawMode = false;

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            drawMode = false;
        }

        if (e.code === "KeyS" && (event.ctrlKey || event.metaKey)) {
            e.preventDefault();
            _.save('myCanvas.png');
            console.log("Saved!");
        }

        if (e.code === "Backspace") {
            drawMode = false;
            _.clear();
            img = imgSrc.get();
        }
    });

    let uploader = document.createElement("input");
    uploader.type = "file";
    uploader.accept = ".jpg, .jpeg, .png, .gif";
    uploader.style.position = "fixed";
    uploader.style.bottom = "0";
    uploader.style.left = "0";
    document.body.appendChild(uploader);

    uploader.addEventListener("change", (e) => {
        file = loadLocal(e.target);
        imgSrc = _.loadImage(file);
        drawMode = false;
        _.clear();
        imgSrc.resize(_.windowWidth, _.windowWidth * aspect);
        img = _.loadImage(file);
    });

    let loadLocal = (input) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file)
        getFileSize(url);
        return url;
    }

    let getFileSize = (url) => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            aspect = img.height / img.width;
        }
    }

    // Preload initial image
    _.preload = () => {
        let url = 'https://upload.wikimedia.org/wikipedia/commons/7/73/God2-Sistine_Chapel.png';
        getFileSize(url);
        imgSrc = _.loadImage(url);
    }

    // Setup initial canvas
    _.setup = () => {
        _.createCanvas(_.windowWidth, _.windowHeight);
        _.noTint();
        _.pixelDensity(1); // Prevents image degradation on get() call in draw()
        _.rectMode(_.CORNERS);
        imgSrc.resize(_.windowWidth, _.windowWidth * aspect);
        img = imgSrc.get();
    };

    // Iteratively draw
    _.draw = () => {
        _.image(img,  0, 0);
        if (_.mouseIsPressed) {
            if (drawMode) {
                let dX = Math.abs(_.mouseX - _.pmouseX);
                let dY = Math.abs(_.mouseY - _.pmouseY);
                let steps = Math.max(dX, dY);

                for (let i = 0; i < steps; i++) {
                    let lerpX = _.lerp(_.pmouseX, _.mouseX, (1.0/steps) * i);
                    let lerpY = _.lerp(_.pmouseY, _.mouseY, (1.0/steps) * i);
                    _.image(selection, lerpX - x, lerpY - y);
                }

                img = _.get();
            } else {
                _.stroke("#FFFFFF");
                _.strokeWeight(1);
                _.noFill();
                _.rect(x, y, _.mouseX, _.mouseY);
            }
        }
    };

    _.mousePressed = () => {
        if (!drawMode) {
            x = _.mouseX;
            y = _.mouseY;
        } else {
            x = _.mouseX - x;
            y = _.mouseY - y;
        }
    }

    _.mouseReleased = () => {
        if(_.mouseX !== x && _.mouseY !== y && !drawMode) {
            w = Math.abs(x - _.mouseX);
            h = Math.abs(y - _.mouseY);
            if (_.mouseX < x) x =  _.mouseX;
            if (_.mouseY < y) y =  _.mouseY;
            selection = img.get(x, y, w, h);
            drawMode = true;
        } else {
            drawMode = false;
        }
    }

    // Window resize event handling
    _.windowResized = () => {
        _.clear();
        _.resizeCanvas(_.windowWidth, _.windowWidth * aspect);
        drawMode = false;
        img = imgSrc.get();
        img.resize(_.windowWidth, _.windowWidth * aspect);
        _.draw();
    }
};
