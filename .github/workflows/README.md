# GitHub Actions Workflows - PoliPet

Este directorio contiene el workflow de CI/CD básico para el proyecto PoliPet.

## 📋 Workflow Disponible

### **CI (ci.yml)**
**Trigger:** PRs y pushes a `main` y `develop`

**Funcionalidades:**
- ✅ Validación de formato de PR (`POLI-0X: Descripción`)
- 🔍 Linting de todos los servicios (backend + frontend)
- 🧪 Tests de servicios backend
- 🏗️ Build del frontend
- 📝 Verificación de TypeScript

## 🏷️ Formato de PRs

Todos los PRs deben seguir el formato:
```
POLI-0X: Descripción del cambio
```

**Ejemplos válidos:**
- `POLI-01: Add user authentication`
- `POLI-02: Implement pet search functionality`
- `POLI-15: Fix login validation bug`

## 🚀 Uso

### Desarrollo Local
```bash
# Crear PR con formato correcto
git checkout -b feature/POLI-01-add-auth
# ... hacer cambios ...
git commit -m "POLI-01: Add user authentication"
git push origin feature/POLI-01-add-auth
# Crear PR con título: "POLI-01: Add user authentication"
```

### Flujo de Trabajo

1. **Desarrollo:** Crear feature branch
2. **PR:** Crear PR con formato `POLI-0X: Descripción`
3. **CI:** Automático - linting, tests, build
4. **Review:** Code review y aprobación
5. **Merge:** Merge a `main` o `develop`

## 📈 Monitoreo

- **GitHub Actions:** Dashboard en la pestaña Actions
- **Checks:** Verificar que todos los jobs pasen antes de mergear

## 🔧 Servicios Incluidos

El workflow verifica:
- **users-service** - Servicio de usuarios y autenticación
- **pets-service** - Servicio de gestión de mascotas
- **adoptions-service** - Servicio de adopciones
- **api-gateway** - Gateway de la API
- **pet-adoption-frontend** - Frontend React 