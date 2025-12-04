from pydantic import BaseSettings # 「環境変数（env）から値を読み込むためのクラス」.env や OS の環境変数を自動で読む

class Settings(BaseSettings):  # .env の中の DATABASE_URL を自動で取ってきてくれる
    DATABASE_URL: str

    class Config:              # Pydantic に対して、この Settings は .env ファイルから読みなさい！と教えている設定。
        env_file = ".env"

settings = Settings()          # 設定を読み込んで、settings という変数にまとめて保持しておいてね。

# .env の値を安全に扱うための「設定用クラス」を作って、そこから settings.DATABASE_URL のように読めるようにしている。