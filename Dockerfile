# Use uma imagem oficial do Node.js para build
FROM node:18 AS builder

# Define o diretório de trabalho no contêiner
WORKDIR /ngo-transparency-client

# Copia apenas os arquivos necessários para instalar dependências
COPY package*.json ./

# Instala apenas as dependências necessárias para build
RUN npm install

# Copia o restante dos arquivos para o contêiner
COPY . .

# Gera a build de produção
RUN npm run build

# Etapa final: servidor para produção
FROM nginx:alpine

# Copia os arquivos da build para o NGINX
COPY --from=builder /ngo-transparency-client/dist /usr/share/nginx/html

# Copia o arquivo de configuração do NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponha a porta padrão do NGINX
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]