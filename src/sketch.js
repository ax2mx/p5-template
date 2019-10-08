// Exporting a function called 'mySketch'
export const mySketch = (p) => {

    // Basic canvas setup
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        // Set default stroke fancy color ^_^
        p.stroke('#3bc9db');
        console.log('p5 setup succeed');
    };

    // Draw diagonals
    p.draw = () => {
        p.line(0, 0, p.windowWidth, p.windowHeight);
        p.line(p.windowWidth, 0, 0, p.windowHeight);
        // console.log('p5 draw succeed');
    };

    // Windows resize event handling
    p.windowResized = () => {
        // Clear canvas
        p.clear();
        // Fit canvas to new window sizes
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        // Draw diagonals
        p.draw();
    }
};
