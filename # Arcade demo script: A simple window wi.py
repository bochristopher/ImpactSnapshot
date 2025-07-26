# Arcade demo script: A simple window with a moving ball

import arcade

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
BALL_RADIUS = 20
BALL_COLOR = arcade.color.BLUE
BALL_SPEED_X = 3
BALL_SPEED_Y = 2

class Ball:
    def __init__(self, x, y, dx, dy):
        self.x = x
        self.y = y
        self.dx = dx
        self.dy = dy

    def update(self):
        self.x += self.dx
        self.y += self.dy

        # Bounce off the edges
        if self.x < BALL_RADIUS or self.x > SCREEN_WIDTH - BALL_RADIUS:
            self.dx *= -1
        if self.y < BALL_RADIUS or self.y > SCREEN_HEIGHT - BALL_RADIUS:
            self.dy *= -1

    def draw(self):
        arcade.draw_circle_filled(self.x, self.y, BALL_RADIUS, BALL_COLOR)

class MyGame(arcade.Window):
    def __init__(self):
        super().__init__(SCREEN_WIDTH, SCREEN_HEIGHT, "Arcade Demo: Moving Ball")
        self.ball = Ball(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2, BALL_SPEED_X, BALL_SPEED_Y)
        arcade.set_background_color(arcade.color.WHITE)

    def on_draw(self):
        arcade.start_render()
        self.ball.draw()

    def on_update(self, delta_time):
        self.ball.update()

def main():
    game = MyGame()
    arcade.run()

if __name__ == "__main__":
    main()
