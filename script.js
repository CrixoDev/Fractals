window.addEventListener("load", function () {
// Get the first canvas and its 2D rendering context
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// Set the dimensions of the first canvas
canvas.width = 600;
canvas.height = 600;

// Canvas Settings for the first canvas
console.log(ctx); // Log the 2D context for debugging purposes
ctx.lineWidth = 10; // Set the line width for drawing
ctx.lineCap = "round"; // Set the line cap style to round
ctx.fillStyle = "blue"; // Set the fill color to blue
ctx.shadowColor = "black"; // Set the shadow color to black
ctx.shadowOffsetY = 10; // Set the vertical shadow offset
ctx.shadowOffsetX = 5; // Set the horizontal shadow offset
ctx.shadowBlur = 10; // Set the shadow blur level

// Get the second canvas and its 2D rendering context
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

// Set the dimensions of the second canvas to match the window size
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

  // Definition of a Snowflake Fractal class representing a canvas with a snowflake pattern
class SnowflakeFractal {
  // Constructor for initializing the fractal properties
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.size = this.canvasWidth * 0.2; // Initial size of the snowflake
    this.slides = 7; // Number of sides in the snowflake shape
    this.maxLevel = 4; // Maximum recursion level
    this.scale = 0.5; // Scaling factor for each iteration
    this.spread = Math.random() * 2.8 + 0.01; // Angle spread between branches
    this.branches = 2; // Number of branches at each level
    this.color =
      "hsla(" +
      Math.random() * 360 +
      ", " +
      Math.random() * 100 +
      "%,  25%, " +
      Math.random() * 1 +
      ")"; // Random color for the snowflake
  }

  // Method to draw the snowflake on the specified 2D rendering context
  draw(context) {
    context.strokeStyle = this.color; // Set the stroke color to the snowflake color
    context.save(); // Save the current transformation state
    context.translate(this.canvasWidth / 2, this.canvasHeight / 2); // Translate to the center of the canvas
    context.rotate(Math.PI * 2); // Rotate by a full circle
    context.scale(1, 1); // Scale by a factor of 1 (no scaling)

    // Loop through the sides of the snowflake shape and draw lines
    for (let i = 0; i < this.slides; i++) {
      this.#drawLine(context, 0); // Call the private method to draw lines
      context.rotate((Math.PI * 2) / this.slides); // Rotate for the next side
    }

    context.restore(); // Restore the saved transformation state
  }

  // Private method to recursively draw lines in the snowflake
  #drawLine(context, level) {
    if (level > this.maxLevel) return; // Exit if the recursion level exceeds the maximum

    context.beginPath(); // Begin a new path for drawing
    context.moveTo(0, 0); // Move to the starting point (center of the snowflake)
    context.lineTo(this.size, 0); // Draw a line from the center to the outer edge
    context.stroke(); // Stroke the path

    // Loop through the branches and draw lines for each branch
    for (let i = 0; i < this.branches; i++) {
      context.save(); // Save the current transformation state
      context.translate(
        this.size - (this.size / this.branches) * i,
        0
      ); // Translate to the starting point of the branch
      context.scale(this.scale, this.scale); // Scale for the next iteration

      // First Line
      context.save();
      context.rotate(this.spread); // Rotate for the first branch
      this.#drawLine(context, level + 1); // Recursive call for the first branch
      context.restore();

      // Second Line
      context.save();
      context.rotate(-this.spread); // Rotate for the second branch
      this.#drawLine(context, level + 1); // Recursive call for the second branch
      context.restore();

      context.restore(); // Restore the saved transformation state
    }
  }
}

  // Definition of a Randomized Pyramid Fractal
  class PyramidFractal {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.baseSize = this.canvasWidth * (0.2 + Math.random() * 0.2); // Random base size
      this.levels = Math.floor(3 + Math.random() * 4); // Random number of levels (between 3 and 6)
      this.scale = 0.5 + Math.random() * 0.5; // Random scale factor
      this.spread = (Math.PI / 4) * (1 + Math.random()); // Random spread angle
      this.color =
        "hsla(" +
        Math.random() * 360 +
        ", " +
        Math.random() * 100 +
        "%,  25%, " +
        Math.random() * 0.5 +
        0.5 + // Ensure minimum saturation is 50%
        ")";
    }

    // Draw the randomized pyramid fractal on the canvas
    draw(context) {
      context.strokeStyle = this.color;
      context.save();
      context.translate(this.canvasWidth / 2, this.canvasHeight / 2);
      context.rotate(Math.PI * 2);
      context.scale(1, 1);

      // Draw the base pyramid line
      this.#drawLine(context, this.baseSize, 0);

      context.restore();
    }

    // Recursive method to draw lines for each level of the pyramid
    #drawLine(context, size, level) {
      if (level >= this.levels) return;

      context.beginPath();
      context.moveTo(-size / 2, 0);
      context.lineTo(size / 2, 0);
      context.stroke();

      context.save();
      context.translate(0, -size / 2);
      context.scale(this.scale, this.scale);

      // Draw the left side
      context.save();
      context.rotate(-this.spread);
      this.#drawLine(context, size * this.scale, level + 1);
      context.restore();

      // Draw the right side
      context.save();
      context.rotate(this.spread);
      this.#drawLine(context, size * this.scale, level + 1);
      context.restore();

      context.restore();
    }
  }

  // Randomized Fractal Triangle
  class FractalTriangle {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.baseSize = this.canvasWidth * (0.3 + Math.random() * 0.5); // Random base size
      this.levels = Math.floor(3 + Math.random() * 4); // Random number of levels (between 3 and 6)
      this.scale = 0.4 + Math.random() * 0.6; // Random scale factor
      this.spread = (Math.PI / 3) * (1 + Math.random()); // Random spread angle (between 60 and 120 degrees)
      this.color =
        "hsla(" +
        Math.random() * 360 +
        ", " +
        Math.random() * 100 +
        "%,  25%, " +
        Math.random() * 0.5 +
        0.5 + // Ensure minimum saturation is 50%
        ")";
    }

    // Draw the randomized fractal triangle on the canvas
    draw(context) {
      context.strokeStyle = this.color;
      context.save();
      context.translate(this.canvasWidth / 2, this.canvasHeight / 2);
      context.rotate(Math.PI * 2);
      context.scale(1, 1);

      // Draw the base triangle
      this.#drawTriangle(context, this.baseSize, 0);

      context.restore();
    }

    // Recursive method to draw triangles for each level of the fractal
    #drawTriangle(context, size, level) {
      if (level >= this.levels) return;

      context.beginPath();
      context.moveTo(-size / 2, 0);
      context.lineTo(size / 2, 0);
      context.lineTo(0, -size);
      context.closePath();
      context.stroke();

      context.save();
      context.translate(0, -size / 2);
      context.scale(this.scale, this.scale);

      // Draw the top triangle
      context.save();
      context.rotate(-this.spread);
      this.#drawTriangle(context, size * this.scale, level + 1);
      context.restore();

      // Draw the right triangle
      context.save();
      context.rotate(this.spread);
      this.#drawTriangle(context, size * this.scale, level + 1);
      context.restore();

      // Draw the left triangle
      context.save();
      context.rotate(Math.PI);
      this.#drawTriangle(context, size * this.scale, level + 1);
      context.restore();

      context.restore();
    }
  }
  // Fractal Tree Class
  class FractalTree {
    // Constructor that initializes the properties of the fractal
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.trunkLength = this.canvasHeight / 5; // Initial length of the trunk
      this.branchAngle = Math.PI / 4; // Branching angle
      this.trunkWidth = 20; // Initial width of the trunk
      this.color =
        "hsla(" +
        Math.random() * 360 +
        ", " +
        Math.random() * 100 +
        "%,  25%, " +
        Math.random() * 1 +
        ")";
    }

    // Public method: draws the tree fractal on the provided context
    draw(context) {
      // Set the stroke style with the random color and trunk width
      context.strokeStyle = this.color;
      context.lineWidth = this.trunkWidth;

      // Calculate the initial coordinates of the trunk
      const trunkStart = { x: this.canvasWidth / 2, y: this.canvasHeight };

      // Call the recursive method to draw the trunk and branches
      this.#drawTreeBranch(context, trunkStart, -Math.PI / 2, this.trunkLength);
    }

    // Private recursive method: draws a segment of the trunk and its branches
    #drawTreeBranch(context, startPoint, angle, length) {
      if (length < 5) {
        // Draw a simple line if the length is short enough
        context.beginPath();
        context.moveTo(startPoint.x, startPoint.y);
        const endPoint = {
          x: startPoint.x + length * Math.cos(angle),
          y: startPoint.y + length * Math.sin(angle),
        };
        context.lineTo(endPoint.x, endPoint.y);
        context.stroke();
      } else {
        // Calculate the end point of the trunk
        const trunkEnd = {
          x: startPoint.x + length * Math.cos(angle),
          y: startPoint.y + length * Math.sin(angle),
        };

        // Draw the trunk
        context.beginPath();
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(trunkEnd.x, trunkEnd.y);
        context.stroke();

        // Calculate coordinates for two branches
        const branchEnd1 = {
          x: trunkEnd.x + length * 0.5 * Math.cos(angle + this.branchAngle),
          y: trunkEnd.y + length * 0.5 * Math.sin(angle + this.branchAngle),
        };
        const branchEnd2 = {
          x: trunkEnd.x + length * 0.5 * Math.cos(angle - this.branchAngle),
          y: trunkEnd.y + length * 0.5 * Math.sin(angle - this.branchAngle),
        };

        // Recursive calls to draw the two branches
        this.#drawTreeBranch(
          context,
          trunkEnd,
          angle + this.branchAngle,
          length * 0.7
        );
        this.#drawTreeBranch(
          context,
          trunkEnd,
          angle - this.branchAngle,
          length * 0.7
        );
      }
    }
  }

  // Define a KochFractal class to draw the Koch fractal on the first canvas
  class KochFractal {
    // Constructor that initializes the properties of the fractal
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.lineLength = this.canvasWidth * 0.8;
      this.angle = Math.PI / 3; // 60 degrees angle for an equilateral triangle
      this.iterations = 4; // Number of iterations to build the fractal
      this.color =
        "hsla(" +
        Math.random() * 360 +
        ", " +
        Math.random() * 100 +
        "%,  25%, " +
        Math.random() * 1 +
        ")";
    }

    // Public method: draws the Koch fractal on the provided context
    draw(context) {
      // Set the stroke style with the random color
      context.strokeStyle = this.color;

      // Calculate the initial coordinates of the triangle
      const p1 = { x: this.canvasWidth / 4, y: this.canvasHeight / 1.5 };
      const p2 = { x: (this.canvasWidth / 4) * 3, y: this.canvasHeight / 1.5 };
      const p3 = this.calculateThirdPoint(p1, p2);

      // Call the recursive method to draw the Koch fractal
      this.#drawKochLine(context, this.iterations, p1, p2);
      this.#drawKochLine(context, this.iterations, p2, p3);
      this.#drawKochLine(context, this.iterations, p3, p1);
    }

    // Private method: calculates the third point of an equilateral triangle
    calculateThirdPoint(p1, p2) {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const thirdPoint = {
        x: p1.x + (Math.cos(angle + this.angle) * distance) / 3,
        y: p1.y + (Math.sin(angle + this.angle) * distance) / 3,
      };
      return thirdPoint;
    }

    // Private recursive method: draws a segment of the Koch fractal
    #drawKochLine(context, iterations, p1, p2) {
      if (iterations === 0) {
        // Draw a simple line if it reaches the final iteration
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.stroke();
      } else {
        // Calculate intermediate points and angles to split the segment
        const p3 = this.calculateThirdPoint(p1, p2);
        const p4 = {
          x: p1.x + (p2.x - p1.x) / 3,
          y: p1.y + (p2.y - p1.y) / 3,
        };
        const p5 = {
          x: p2.x - (p2.x - p1.x) / 3,
          y: p2.y - (p2.y - p1.y) / 3,
        };
        const p6 = this.calculateThirdPoint(p2, p1);

        // Recursive calls for the smaller segments
        this.#drawKochLine(context, iterations - 1, p1, p4);
        this.#drawKochLine(context, iterations - 1, p4, p3);
        this.#drawKochLine(context, iterations - 1, p3, p5);
        this.#drawKochLine(context, iterations - 1, p5, p2);
        this.#drawKochLine(context, iterations - 1, p2, p6);
        this.#drawKochLine(context, iterations - 1, p6, p1);
      }
    }
  }

  // Define a SpiralFractal class to draw a spiral fractal on the canvas
  class SpiralFractal {
    // Constructor that initializes the properties of the fractal
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.startX = this.canvasWidth / 2;
      this.startY = this.canvasHeight / 2;
      this.radius = 1;
      this.angle = 0;
      this.angleIncrement = 0.1 + Math.random() * 0.2; // Randomized angle increment
      this.iterations = 500;
      this.color =
        "hsla(" +
        Math.random() * 360 +
        ", " +
        Math.random() * 100 +
        "%, 50%, " +
        Math.random() * 1 +
        ")";
    }

    // Public method: draws the spiral fractal on the provided context
    draw(context) {
      context.strokeStyle = this.color;

      // Iterate through the specified number of iterations
      for (let i = 0; i < this.iterations; i++) {
        const x = this.startX + this.radius * Math.cos(this.angle);
        const y = this.startY + this.radius * Math.sin(this.angle);

        // Draw a point at the current position
        context.beginPath();
        context.arc(x, y, 1, 0, 2 * Math.PI);
        context.stroke();

        // Update radius and angle for the next iteration
        this.radius += 0.5;
        this.angle += this.angleIncrement;
      }
    }
  }

  // Define a HilbertFractal class to draw the Hilbert curve on the canvas
  class HilbertFractal {
    // Constructor that initializes the properties of the fractal
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.order = Math.floor(2 + Math.random() * 4); // Order of the Hilbert curve (you can adjust this)
      this.size = Math.min(this.canvasWidth, this.canvasHeight);
      this.unit = this.size / Math.pow(2, this.order);
      this.path = [];
      this.color =
        "hsla(" +
        Math.random() * 360 +
        ", " +
        Math.random() * 100 +
        "%, 50%, " +
        Math.random() * 1 +
        ")";
    }
    // Public method: draws the Hilbert curve on the provided context
    draw(context) {
      context.strokeStyle = this.color;
      context.beginPath();

      // Start the Hilbert curve in the bottom-left quadrant
      this.#hilbert(0, 0, this.order, 0);

      // Draw the curve
      for (let i = 0; i < this.path.length - 1; i++) {
        const p1 = this.path[i];
        const p2 = this.path[i + 1];
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
      }

      context.stroke();
    }
    // Private recursive method: generates the Hilbert curve
    #hilbert(x, y, order, angle) {
      if (order === 0) {
        const point = {
          x: x * this.unit + this.unit / 2,
          y: y * this.unit + this.unit / 2,
        };
        this.path.push(point);
      } else {
        const nextOrder = order - 1;
        const nextUnit = this.unit / Math.pow(2, nextOrder);

        this.#hilbert(x, y, nextOrder, angle);
        this.#hilbert(x, y + 1, nextOrder, angle + 90);
        this.#hilbert(x + 1, y + 1, nextOrder, angle);
        this.#hilbert(x + 1, y, nextOrder, angle - 90);
      }
    }
  }

  // Define a SierpinskiFractal class to draw the Sierpinski triangle on the canvas
  class SierpinskiFractal {
    // Constructor that initializes the properties of the fractal
    constructor(canvasWidth, canvasHeight, depth) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.depth = depth || Math.floor(3 + Math.random() * 3); // Random depth (you can adjust this)
      this.spread = Math.random() * 2.8 + 0.01; // Random spread factor
      this.branches = 2;
      this.color =
        "hsla(" +
        Math.random() * 360 +
        ", " +
        Math.random() * 100 +
        "%,  25%, " +
        Math.random() * 1 +
        ")";
    }

    // Public method: draws the Sierpinski triangle on the provided context
    draw(context) {
      const triangleHeight = (Math.sqrt(3) / 2) * this.canvasWidth;

      // Define the vertices of the initial equilateral triangle
      const p1 = { x: 0, y: this.canvasHeight };
      const p2 = { x: this.canvasWidth / 2, y: 0 };
      const p3 = { x: this.canvasWidth, y: this.canvasHeight };

      // Call the recursive method to draw the Sierpinski triangle
      this.#drawSierpinski(context, this.depth, p1, p2, p3);
    }

    // Private recursive method: generates the Sierpinski triangle
    #drawSierpinski(context, depth, p1, p2, p3) {
      if (depth === 0) {
        // Draw the triangle at the lowest level
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
      } else {
        // Calculate the midpoints of the sides of the triangle
        const middle1 = {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2,
        };
        const middle2 = {
          x: (p2.x + p3.x) / 2,
          y: (p2.y + p3.y) / 2,
        };
        const middle3 = {
          x: (p1.x + p3.x) / 2,
          y: (p1.y + p3.y) / 2,
        };

        // Calculate the interior (center) point of the triangle
        const center = {
          x: (middle1.x + middle2.x + middle3.x) / 3,
          y: (middle1.y + middle2.y + middle3.y) / 3,
        };

        // Recursive calls for the three smaller triangles
        this.#drawSierpinski(context, depth - 1, p1, middle1, center);
        this.#drawSierpinski(context, depth - 1, middle1, p2, center);
        this.#drawSierpinski(context, depth - 1, p2, middle2, center);
        this.#drawSierpinski(context, depth - 1, middle2, p3, center);
        this.#drawSierpinski(context, depth - 1, p3, middle3, center);
        this.#drawSierpinski(context, depth - 1, middle3, p1, center);
      }
    }
  }

  // Define a Particle class for creating moving particles on the canvas
  class Particle {
    // Constructor that initializes the properties of the particle
    constructor(canvasWidth, canvasHeight, image) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.image = image;
      this.x = Math.random() * this.canvasWidth;
      this.y = Math.random() * this.canvasHeight;
      this.sizeModifier = Math.random() * 0.5 + 0.1; // Random size modifier
      this.width = this.image.width * this.sizeModifier;
      this.height = this.image.height * this.sizeModifier;
      this.speed = Math.random() * 5 + 0.2; // Random speed
      this.direction = Math.random() * Math.PI * 2; // Random initial direction
    }

    // Update method: moves the particle and handles boundary conditions
    update() {
      this.x += this.speed * Math.cos(this.direction);
      if (this.x > this.canvasWidth + this.width) this.x = -this.width;
      this.y += this.speed * Math.sin(this.direction);
      if (this.y > this.canvasHeight + this.height) this.y = -this.height;
    }

    // Draw method: draws the particle on the provided context
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  // Define a Rain class to create a rain effect using particles on the canvas
  class Rain {
    // Constructor that initializes properties for rain simulation
    constructor(canvasWidth, canvasHeight, image) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.image = image;
      this.numberOfParticles = 40; // Number of raindrops
      this.particles = [];
      this.#initialize();
    }

    // Private method to initialize raindrop particles
    #initialize() {
      for (let i = 0; i < this.numberOfParticles; i++) {
        this.particles.push(
          new Particle(this.canvasWidth, this.canvasHeight, this.image)
        );
      }
    }

    // Public method to run the rain simulation and update/draw each raindrop
    run(context) {
      this.particles.forEach((particle) => {
        particle.draw(context);
        particle.update();
      });
    }
  }
  
  // Create an array with instances of different fractal classes
  const fractals = [
    new SnowflakeFractal(canvas.width, canvas.height),
    new PyramidFractal(canvas.width, canvas.height),
    new FractalTree(canvas.width, canvas.height),
    new FractalTriangle(canvas.width, canvas.height),
    new KochFractal(canvas.width, canvas.height),
    new SpiralFractal(canvas.width, canvas.height),
    new HilbertFractal(canvas.width, canvas.height),
    new SierpinskiFractal(canvas.width, canvas.height),
  ];

  // Choose a random fractal instance from the array
  const randomFractal = fractals[Math.floor(Math.random() * fractals.length)];

// Draw the selected fractal on the canvas
randomFractal.draw(ctx);

// Get the name of the generated fractal
const fractalName = randomFractal.constructor.name;

// Access the HTML element where the fractal name will be displayed
const fractalNameDiv = document.getElementById("fractalNameDiv");

// Set the inner HTML of the element with the generated fractal name
fractalNameDiv.innerHTML = `Generated Fractal: ${fractalName}. Press F5 to refresh`;

// Display the div containing the fractal name
fractalNameDiv.style.display = "block";

// Create an image from the canvas
const fractalImage = new Image();
fractalImage.src = canvas.toDataURL("image/png");

// Event handler for the image load
fractalImage.onload = function () {
  // Create a rain effect using the fractal image
  const rainEffect = new Rain(canvas2.width, canvas2.height, fractalImage);

  // Animation loop for the rain effect
  function animate() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    // Draw the rain on the rain canvas
    rainEffect.run(ctx2);

    requestAnimationFrame(animate);
  }

  // Start the animation loop
  animate();
};
 
});
