# Imagem oficial do Nginx (versão Alpine, bem leve) para servir arquivos estáticos
FROM nginx:alpine

# Configuração do servidor (UTF-8 e sem cache, ideal para desenvolvimento)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o site (HTML + JavaScript) para a pasta publicada pelo Nginx
COPY src/ /usr/share/nginx/html/

# Porta em que o Nginx escuta dentro do container
EXPOSE 80
