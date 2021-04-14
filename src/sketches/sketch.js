export const sketch = (_) => {

    _.setup = () => {
        _.createCanvas(_.windowWidth, _.windowHeight);
        _.stroke('#3bc9db');
    };
    
    _.draw = () => {
        _.line(0, 0, _.windowWidth, _.windowHeight);
        _.line(_.windowWidth, 0, 0, _.windowHeight);
    };

    // Windows resize event handling
    _.windowResized = () => {
        _.clear();
        _.resizeCanvas(_.windowWidth, _.windowHeight);
        _.draw();
    }
};
