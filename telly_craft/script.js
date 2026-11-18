
document.addEventListener("DOMContentLoaded", () => {

  // نمایش پیام در سایت
  function showNotice(message) {
    const notice = document.getElementById("notice");

    if (notice) {
      notice.textContent = message;
    } else {
      alert(message);
    }
  }

  // =========================
  // ADMIN LOGIN
  // =========================

  const adminForm = document.getElementById("adminForm");

  if (adminForm) {
    adminForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username =
        document.getElementById("adminUsername")?.value.trim();

      const password =
        document.getElementById("adminPassword")?.value;

      if (!username || !password) {
        showNotice("نام کاربری و رمز عبور را وارد کن!");
        return;
      }

      try {
        const response = await fetch("/api/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showNotice("ورود مدیر با موفقیت انجام شد!");

          adminForm.reset();

          const adminPanel =
            document.getElementById("adminPanel");

          if (adminPanel) {
            adminPanel.style.display = "block";
          }

        } else {
          showNotice(
            result.message || "نام کاربری یا رمز اشتباه است!"
          );
        }

      } catch (error) {
        showNotice("ارتباط با سرور برقرار نشد!");
        console.error(error);
      }
    });
  }

  // =========================
  // CHECK ADMIN LOGIN
  // =========================

  async function checkAdmin() {
    try {
      const response = await fetch("/api/admin/check");
      const result = await response.json();

      const adminPanel =
        document.getElementById("adminPanel");

      if (adminPanel) {
        adminPanel.style.display =
          result.isAdmin ? "block" : "none";
      }

    } catch (error) {
      console.error("Admin check error:", error);
    }
  }

  checkAdmin();

  // =========================
  // ADMIN LOGOUT
  // =========================

  const logoutButton =
    document.getElementById("adminLogout");

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        const response = await fetch("/api/admin/logout", {
          method: "POST"
        });

        if (response.ok) {
          showNotice("از حساب مدیر خارج شدی!");

          const adminPanel =
            document.getElementById("adminPanel");

          if (adminPanel) {
            adminPanel.style.display = "none";
          }
        }

      } catch (error) {
        showNotice("خطا در خروج از حساب!");
      }
    });
  }

  // =========================
  // SUPPORT FORM
  // =========================

  const supportForm =
    document.getElementById("supportForm");

  if (supportForm) {
    supportForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name =
        document.getElementById("supportName")?.value.trim();

      const subject =
        document.getElementById("supportSubject")?.value.trim();

      const message =
        document.getElementById("supportMessage")?.value.trim();

      if (!name || !subject || !message) {
        showNotice("لطفاً تمام قسمت‌ها را پر کن!");
        return;
      }

      showNotice(
        "پیام شما ثبت نشد؛ سیستم ارسال پیام هنوز راه‌اندازی نشده است."
      );
    });
  }

});
