# DevPod Workspace Recreation Guide

Since we have pushed the new environment configuration to GitHub, you can now recreate your workspace to ensure everything is fresh and synced.

**Note:** You will need to perform these steps on your **local machine** (Windows), as disconnecting the workspace will terminate our current session.

## 1. Delete the Current Workspace (Optional but Recommended)
To start fresh, delete the existing workspace in DevPod.

**Via UI:**
1. Open DevPod Desktop.
2. Find the running workspace.
3. Click the **Trash icon** (Delete).

**Via CLI (PowerShell/CMD):**
```powershell
devpod delete <workspace-id>
# You can list workspaces with: devpod list
```

## 2. Create the New Workspace
Use the GitHub repository URL we just updated.

**Via UI:**
1. Click **Create Workspace**.
2. **Repository URL**: `https://github.com/andersen941972/cloudflare-workers-template.git`
3. **Provider**: Select your VPS provider (SSH/Kamatera).
4. **Create**.

**Via CLI:**
```powershell
devpod up https://github.com/andersen941972/cloudflare-workers-template.git --provider <your-provider-name>
```

## 3. Verify the New Environment
Once connected:
1. Open the terminal in VS Code.
2. Verify the directory structure:
    ```bash
    ls -la /workspaces
    ```
    You should see `template` directory and `SESSION_SUMMARY.md`.
3. Try creating a new project from the template:
    ```bash
    cp -r /workspaces/template /workspaces/test-project
    cd /workspaces/test-project
    npm install
    npm run dev
    ```

## 4. Important Notes
- **Changes Persistence**: Now that you are using a Git repository as the source, future changes to global config (`devcontainer.json`, etc.) should be pushed to Git to persist across workspace recreations.
- **Project Files**: If you create new projects inside `/workspaces/`, remember they are **not** automatically part of the `template` repository. You should manage them as their own git repositories or push them if you intend to keep them in the main repo.
