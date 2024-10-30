import pygame
pygame.init()        
WIDTH = 700
HEIGHT = 700
FPS = 60

# colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (80, 175, 90)
BLUE = (60, 160, 200)

COLS = 10
ROWS = 6

win = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Breakout Game")
clock = pygame.time.Clock()

# Brick class
class Brick():
    def __init__(self):
        self.width = int(WIDTH / COLS)
        self.height = 30
    def create_bricks(self):
        self.bricks = []
        for row in range(ROWS):
            bricks_row = []
            for col in range(COLS):
                brick_x = col * self.width
                brick_y = row * self.height
                br = pygame.Rect(brick_x, brick_y, self.width, self.height)
                bricks_row.append(br)
            self.bricks.append(bricks_row)
    def draw_bricks(self):
        for row in self.bricks:
            for br in row:
                pygame.draw.rect(win, GREEN, br)
                pygame.draw.rect(win, BLACK, br, 2)

# Paddle class
class Paddle(): 
    def __init__(self):
        self.width = int(WIDTH / COLS)
        self.height = 20 
        self.x = int(WIDTH / 2) - int(self.width / 2)
        self.y = HEIGHT - 40
        self.speed = 10
        self.rect = pygame.Rect(self.x, self.y, self.width, self.height)
    def draw_paddle(self):
        pygame.draw.rect(win, WHITE, self.rect)
    def move_paddle(self):
        key = pygame.key.get_pressed()
        if key[pygame.K_LEFT] and self.rect.left > 0:
            self.rect.x -= self.speed
        if key[pygame.K_RIGHT] and self.rect.right < WIDTH:
            self.rect.x += self.speed

# Ball class
class Ball():
    def __init__(self, x, y):
        self.radius = 10
        self.x = x
        self.y = y
        self.rect = pygame.Rect(self.x, self.y, self.radius * 2, self.radius * 2)
        self.dx = 3
        self.dy = -3
        self.score = 0
        self.game_status = 0
    def draw_ball(self):
        pygame.draw.circle(win, BLUE, (self.rect.x, self.rect.y), self.radius)    
    def move_ball(self):
        # Wall collision
        if self.rect.right > WIDTH or self.rect.left < 0:
            self.dx *= -1
        if self.rect.top < 0:
            self.dy *= -1
        if self.rect.bottom > HEIGHT:
            self.game_status = -1  # Game over

        # Paddle collision
        if self.rect.colliderect(paddle.rect) and self.dy > 0:
            self.dy *= -1

        # Brick collision
        all_done = True
        row_num = 0
        for row in brick_wall.bricks:
            col_num = 0
            for br in row:
                if self.rect.colliderect(br):
                    self.score += 10  # Increase score on brick hit
                    if abs(self.rect.bottom - br.top) < 5 and self.dy > 0:
                        self.dy *= -1
                    if abs(self.rect.top - br.bottom) < 5 and self.dy < 0:
                        self.dy *= -1
                    if abs(self.rect.left - br.right) < 5 and self.dx < 0:
                        self.dx *= -1
                    if abs(self.rect.right - br.left) < 5 and self.dx > 0:
                        self.dx *= -1
                    brick_wall.bricks[row_num][col_num] = (0, 0, 0, 0)
                if brick_wall.bricks[row_num][col_num] != (0, 0, 0, 0):
                    all_done = False    
                col_num += 1
            row_num += 1
            if all_done:
                self.game_status = 1  # Win condition

        self.rect.x += self.dx
        self.rect.y += self.dy
        return self.game_status

# Restart function
def restart_game():
    global ball, brick_wall
    ball = Ball(paddle.x + int(paddle.width / 2), paddle.y - 10)
    brick_wall.create_bricks()

paddle = Paddle()
ball = Ball(paddle.x + int(paddle.width / 2), paddle.y - 10)
brick_wall = Brick()
brick_wall.create_bricks()
font = pygame.font.SysFont(None, 30) 

# Main loop
run = True
while run:
    clock.tick(FPS)
    win.fill(BLACK)
    
    # Draw paddle, ball, and bricks
    paddle.draw_paddle()
    paddle.move_paddle()
    ball.draw_ball()
    brick_wall.draw_bricks()

   # Display score with adjusted spacing
    score_text = font.render(f'Score: {ball.score}', True, WHITE)
    win.blit(score_text, (10, 10))  # Position the score at the top-left with a bit more space

    # Player indicator with adjusted spacing
    player_text = font.render("Player 1", True, WHITE)
    win.blit(player_text, (WIDTH - 120, 10))  # Position "Player 1" text a bit away from the right edge

    
    # Game status check
    game_status = ball.move_ball()
    if game_status == -1:
        font = pygame.font.SysFont(None, 50)
        text = font.render('Game Over', True, BLUE)
        text_rect = text.get_rect(center=(WIDTH / 2, HEIGHT / 2))
        win.blit(text, text_rect)
        
        # Restart button
        restart_text = font.render("Press R to Restart", True, WHITE)
        restart_rect = restart_text.get_rect(center=(WIDTH / 2, HEIGHT / 2 + 50))
        win.blit(restart_text, restart_rect)
    elif game_status == 1:
        font = pygame.font.SysFont(None, 50)
        text = font.render('You Win!', True, BLUE)
        text_rect = text.get_rect(center=(WIDTH / 2, HEIGHT / 2))
        win.blit(text, text_rect)

        # Restart button
        restart_text = font.render("Press R to Restart", True, WHITE)
        restart_rect = restart_text.get_rect(center=(WIDTH / 2, HEIGHT / 2 + 50))
        win.blit(restart_text, restart_rect)
    
    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_r:  # Restart game on pressing 'R'
                restart_game()

    pygame.display.update()

pygame.quit()
