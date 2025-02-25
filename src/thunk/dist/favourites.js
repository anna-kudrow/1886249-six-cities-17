"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.changeFavouriteStatus = exports.fetchFavourits = void 0;
var hooks_1 = require("@/hooks");
var const_1 = require("@/libs/const");
var storage_1 = require("@/storage");
var fullOffer_1 = require("@/storage/slices/fullOffer");
var offers_1 = require("@/storage/slices/offers");
var sliceNames_1 = require("@/storage/slices/sliceNames");
exports.fetchFavourits = hooks_1.createAppAsyncThunk(sliceNames_1.FAVOURITES_SLICE_NAME + "/fetch", function (_, thunkApi) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, storage_1.api.get(const_1.APIRouts.Favourite)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.data];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    return [2 /*return*/, thunkApi.rejectWithValue(error_1.message)];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.changeFavouriteStatus = hooks_1.createAppAsyncThunk(sliceNames_1.FAVOURITES_SLICE_NAME + "/changeFavouriteStatus", function (_a, _b) {
    var id = _a.id, favouriteStatus = _a.favouriteStatus;
    var dispatch = _b.dispatch, rejectWithValue = _b.rejectWithValue;
    return __awaiter(void 0, void 0, void 0, function () {
        var result, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, storage_1.api.post(const_1.APIRouts.Favourite + "/" + id + "/" + favouriteStatus)];
                case 1:
                    result = _c.sent();
                    dispatch(fullOffer_1.offerFullActions.updateFavouriteOffer(result.data.isFavorite));
                    dispatch(offers_1.offersActions.updateOffer(result.data));
                    return [2 /*return*/, result.data];
                case 2:
                    error_2 = _c.sent();
                    if (error_2 instanceof Error) {
                        return [2 /*return*/, rejectWithValue(error_2.message)];
                    }
                    return [2 /*return*/, rejectWithValue('Unknown error occurred')];
                case 3: return [2 /*return*/];
            }
        });
    });
});
