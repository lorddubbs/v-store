import { $apiService } from "../services/api";

export default function(store) {
  try {
    store.$apiService = $apiService;
  } catch (e) {
    console.error(e);
  }
}
