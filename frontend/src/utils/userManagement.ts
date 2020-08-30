export const isLoggedIn = () => !!getUserId();

export const getUserId = () => localStorage.getItem("id");

export const logIn = (id: string) => localStorage.setItem("id", id);

export const logOut = () => {
  localStorage.removeItem("id");
  window.location.reload();
};
