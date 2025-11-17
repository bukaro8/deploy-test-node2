
```
coolify-deploy-guide.md
```

---

# 🚀 Coolify-Deploy – Deployment Guide (Git + Nixpacks + Cloudflare Tunnel)

This is the clean, reliable process for deploying applications to **m910q-deploy** using **Coolify v4**, **Git repos**, **Nixpacks**, and **Cloudflare Tunnel**.

Designed for Node, Next.js, Django, or any web app with a listening port.

---

## **1. Create the Cloudflare Tunnel (FIRST)**

In **Cloudflare Zero Trust → Access → Tunnels**:

1. Select your existing tunnel (or create one if needed).
2. Go to **Public Hostnames** → **Add a public hostname**.
3. Fill in:

```
Hostname: your-app.vicstack.uk
Type: HTTP
URL: http://192.168.0.186:80
```

4. Save.

This gives you the domain to use inside Coolify.

---

## **2. Create a new application in Coolify**

Inside Coolify (`http://192.168.0.186:8000`):

1. Go to **Projects → deploy-apps**
2. Click **+ New → Application**
3. Choose **Git Repository**
4. Enter:

   * Git URL
   * Branch: `main`
5. Select **Nixpacks** as the build pack
6. Click **Create**
7. **Do NOT deploy yet**

---

## **3. Set the app name and domain**

Inside the application:

1. Navigate to **Configuration**
2. Change **Application Name** (optional)
3. Set the **Domain / FQDN** to the hostname from Cloudflare:

```
your-app.vicstack.uk
```

4. Click **Save**

---

## **4. Fix routing rules → Save → Deploy**

Coolify often generates incorrect Traefik rules.
Fix them under **Container Labels**.

### Replace the incorrect rule:

❌

```
Host(``) && PathPrefix(`your-app.vicstack.uk`)
```

### With the correct one:

✔

```
traefik.http.routers.http-0-<id>.rule=Host(`your-app.vicstack.uk`) && PathPrefix(`/`)
```

### Also ensure Caddy listens on port 80:

```
caddy_0 = :80
```

Click **Save**, then **Redeploy** the app.

---

## **5. Test internally (on the server)**

SSH into `m910q-deploy` and run:

```bash
curl -H "Host: your-app.vicstack.uk" http://127.0.0.1:80/
```

If everything is correct, you will see your app’s output.

If you see `404 page not found`, the routing labels need correction.

---

## **6. Test publicly**

Open in any browser:

```
https://your-app.vicstack.uk
```

Your app should load immediately.

---

# ✅ Summary Checklist

* [ ] Cloudflare Tunnel → hostname → `http://192.168.0.186:80`
* [ ] Coolify app created via Git + Nixpacks
* [ ] Application name set (optional but tidy)
* [ ] Domain set to your Cloudflare hostname
* [ ] Traefik rule fixed to:

  ```
  Host(`your-app.vicstack.uk`) && PathPrefix(`/`)
  ```
* [ ] `caddy_0 = :80`
* [ ] Redeployed successfully
* [ ] `curl -H "Host:..." http://127.0.0.1:80/` returns app output
* [ ] Public URL works via HTTPS

---

If you want, I can also generate:

* A **README version**
* A **PDF**
* A **version with examples** (Node, Next.js, Django)
* A **Coolify template file** you can import

Just tell me.
