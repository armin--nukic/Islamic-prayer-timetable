# VPS Deploy Guide

Use this guide to host the app on a Linux VPS with Nginx.

## 1. Upload Files

Copy the project files to the server, for example:

```bash
sudo mkdir -p /var/www/vaktija
sudo cp -r . /var/www/vaktija
sudo chown -R www-data:www-data /var/www/vaktija
```

## 2. Nginx Config

Create:

```bash
sudo nano /etc/nginx/sites-available/vaktija
```

Add:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    root /var/www/vaktija;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(css|js|svg|json|png|jpg|jpeg|webp|ico)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }
}
```

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/vaktija /etc/nginx/sites-enabled/vaktija
sudo nginx -t
sudo systemctl reload nginx
```

## 3. HTTPS

Install Certbot and request a certificate:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 4. Verify

Open the domain and test:

- city search with `Berlin`
- night mode
- mobile layout
- service worker refresh behavior
