import Vue from "vue";
import { $apiService } from "../../services/api";

Vue.mixin({
  computed: {
    $apiService: () => $apiService
  }
});
