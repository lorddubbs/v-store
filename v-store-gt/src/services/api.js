import Vue from "vue";
import axios from "axios";

class BaseApiService {
  baseUrl = process.env.API_URL;
  resource;

  constructor(resource) {
    if (!resource) throw new Error("No resource is provided");
    this.resource = resource;
  }

  defaultUrl(id = "") {
    return `${this.baseUrl}/${this.resource}/${id}`;
  }


  handleErrors(error) {
    let errors = error.response.data.errors;
    if (
      error.response.status === 404
    ) {
      Vue.$toast.error(error.response.data.message);
      return;
    }
    for (let field of Object.keys(errors)) {
      Vue.$toast.error(errors[field][0], "error");
    }
  }
}

class GetterApiService extends BaseApiService {
  constructor(resource) {
    super(resource);
  }
  async fetch(config = {}) {
    try {
      const response = await axios.get(this.defaultUrl(), config);
      return response.data;
    } catch (error) {
      this.handleErrors(error);
    }
  }
  async get(id) {
    try {
      if (!id) throw Error("No record id is provided");
      const response = await axios.get(this.defaultUrl(id));
      return response.data;
    } catch (error) {
      this.handleErrors(error);
    }
  }
}

class ModelApiService extends GetterApiService {
  constructor(resource) {
    super(resource);
  }
  async post(data = {}) {
    try {
      const response = await axios.post(this.defaultUrl(), data);
      //const { id } = response.data;
      //return id;
      return response.data;
    } catch (error) {
      this.handleErrors(error);
    }
  }
  async put(id, data = {}) {
    if (!id) throw Error("No record id is provided");
    try {
      const response = await axios.put(this.defaultUrl(id), data);
      //const { id: responseId } = response.data;
      //return responseId;
      return response.data;
    } catch (error) {
      this.handleErrors(error);
    }
  }
  async delete(id) {
    if (!id) throw Error("No record id is provided");
    try {
      await axios.delete(this.defaultUrl(id));
      return true;
    } catch (error) {
      this.handleErrors(error);
    }
  }
}

class AuthApiService extends ModelApiService {
  constructor() {
    super("auth");
  }

  async loginUser(payload) {
    try {
      const response = await axios.post(
        this.defaultUrl() + "login",
        payload
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      this.handleErrors(error);
    }
  }
}

class UsersApiService extends ModelApiService {
  constructor() {
    super("users");
  }
}

export const $apiService = {
  auth: new AuthApiService(),
  users: new UsersApiService()
};
