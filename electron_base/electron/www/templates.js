(function (global) {
  (function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["_cat_form.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("_macros.html", false, "_cat_form.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "cat_icon")) {
var t_4 = t_1.cat_icon;
} else {
cb(new Error("cannot import 'cat_icon'")); return;
}
context.setVariable("cat_icon", t_4);
output += "\n<div class=\"cat-panel p-4 mb-4\">\n    <div class=\"d-flex align-items-center justify-content-between mb-3\">\n        <h2 class=\"h5 fw-800 mb-0\">\n            <i class=\"bi ";
if(runtime.contextOrFrameLookup(context, frame, "catFormId")) {
output += "bi-pencil-square";
;
}
else {
output += "bi-plus-circle";
;
}
output += " text-primary me-2\"></i>\n            ";
if(runtime.contextOrFrameLookup(context, frame, "catFormId")) {
output += "Редактирование котика";
;
}
else {
output += "Новый котик";
;
}
output += "\n        </h2>\n        <button type=\"button\" class=\"btn btn-outline-secondary btn-icon border-0\" id=\"catCancelX\" aria-label=\"Закрыть\">\n            <i class=\"bi bi-x-lg\"></i>\n        </button>\n    </div>\n\n    <form id=\"catForm\" data-cat-id=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "catFormId") || "", env.opts.autoescape);
output += "\" novalidate>\n        <div class=\"row g-4\">\n            <div class=\"col-12 col-md-4 col-lg-3\">\n                <label class=\"photo-drop\" id=\"photoDrop\" for=\"catPhoto\">\n                    <img id=\"photoPreview\" src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "catForm")),"photo"), env.opts.autoescape);
output += "\" alt=\"\" class=\"";
if(!runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "catForm")),"photo")) {
output += "d-none";
;
}
output += "\">\n                    <span class=\"hint ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "catForm")),"photo")) {
output += "d-none";
;
}
output += "\" id=\"photoHint\">\n                        <i class=\"bi bi-camera d-block mb-1\"></i>\n                        Нажмите или перетащите фото\n                        <span class=\"d-block small opacity-75\">JPG, PNG, WEBP до 10 МБ</span>\n                    </span>\n                </label>\n                <input type=\"file\" class=\"d-none\" id=\"catPhoto\" accept=\"image/png,image/jpeg,image/webp,image/gif\">\n                <div class=\"d-flex gap-2 mt-2\">\n                    <button type=\"button\" class=\"btn btn-sm btn-outline-secondary flex-fill\" id=\"photoPick\">\n                        <i class=\"bi bi-image me-1\"></i>Выбрать\n                    </button>\n                    <button type=\"button\" class=\"btn btn-sm btn-outline-danger ";
if(!runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "catForm")),"photo")) {
output += "d-none";
;
}
output += "\" id=\"photoRemove\"\n                            aria-label=\"Убрать фото\" data-bs-toggle=\"tooltip\" title=\"Убрать фото\">\n                        <i class=\"bi bi-trash3\"></i>\n                    </button>\n                </div>\n            </div>\n\n            <div class=\"col-12 col-md-8 col-lg-9\">\n                <div class=\"row g-3\">\n                    <div class=\"col-12 col-lg-6\">\n                        <label for=\"catName\" class=\"form-label\">Кличка <span class=\"text-danger\">*</span></label>\n                        <input type=\"text\" class=\"form-control\" id=\"catName\" maxlength=\"50\" required\n                               placeholder=\"Например, Барсик\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "catForm")),"cat_name"), env.opts.autoescape);
output += "\">\n                        <div class=\"invalid-feedback\">Введите кличку котика.</div>\n                    </div>\n                    <div class=\"col-12 col-lg-6\">\n                        <label for=\"catBreed\" class=\"form-label\">Порода</label>\n                        <input type=\"text\" class=\"form-control\" id=\"catBreed\" maxlength=\"100\" list=\"breedOptions\"\n                               placeholder=\"Беспородный\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "catForm")),"breed"), env.opts.autoescape);
output += "\">\n                        <datalist id=\"breedOptions\">\n                            ";
frame = frame.push();
var t_7 = runtime.contextOrFrameLookup(context, frame, "breeds");
if(t_7) {t_7 = runtime.fromIterator(t_7);
var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("breed", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "<option value=\"";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += "\">";
;
}
}
frame = frame.pop();
output += "\n                        </datalist>\n                    </div>\n                    <div class=\"col-12 col-lg-6\">\n                        <label class=\"form-label d-block\">Пол</label>\n                        <div class=\"btn-group w-100 text-nowrap\" role=\"group\" aria-label=\"Пол\">\n                            <input type=\"radio\" class=\"btn-check\" name=\"catGender\" id=\"genderMale\" value=\"male\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "catForm")),"gender") != "female") {
output += "checked";
;
}
output += ">\n                            <label class=\"btn btn-outline-primary\" for=\"genderMale\"><i class=\"bi bi-gender-male me-1\"></i>Кот</label>\n                            <input type=\"radio\" class=\"btn-check\" name=\"catGender\" id=\"genderFemale\" value=\"female\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "catForm")),"gender") == "female") {
output += "checked";
;
}
output += ">\n                            <label class=\"btn btn-outline-primary\" for=\"genderFemale\"><i class=\"bi bi-gender-female me-1\"></i>Кошка</label>\n                        </div>\n                    </div>\n                    <div class=\"col-12 col-lg-6\">\n                        <label for=\"catAge\" class=\"form-label\">Возраст, лет</label>\n                        <input type=\"number\" class=\"form-control\" id=\"catAge\" min=\"0\" max=\"30\" step=\"1\"\n                               placeholder=\"—\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "catForm")),"age"), env.opts.autoescape);
output += "\">\n                        <div class=\"invalid-feedback\">От 0 до 30 лет.</div>\n                    </div>\n                    <div class=\"col-12\">\n                        <label for=\"catInfo\" class=\"form-label\">Описание</label>\n                        <textarea class=\"form-control\" id=\"catInfo\" rows=\"2\" maxlength=\"500\"\n                                  placeholder=\"Характер, привычки, любимые игрушки…\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "catForm")),"cat_information"), env.opts.autoescape);
output += "</textarea>\n                    </div>\n                </div>\n\n                <div class=\"alert alert-danger py-2 small d-none mt-3 mb-0\" id=\"catFormError\"></div>\n\n                <div class=\"d-flex gap-2 mt-4\">\n                    <button type=\"submit\" class=\"btn btn-primary\" id=\"catSubmitBtn\">\n                        <span class=\"spinner-border spinner-border-sm me-2 d-none\" id=\"catSpinner\" role=\"status\"></span>\n                        <i class=\"bi bi-check-lg me-1\" id=\"catSubmitIcon\"></i>\n                        <span id=\"catSubmitText\">Сохранить</span>\n                    </button>\n                    <button type=\"button\" class=\"btn btn-outline-secondary\" id=\"catCancelBtn\">Отмена</button>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n\n<script>\n(() => {\n    const form = document.getElementById('catForm');\n    if (!form) return;\n\n    const api = window.taskflowCats;\n    const catId = form.dataset.catId || null;\n    const fileInput = document.getElementById('catPhoto');\n    const drop = document.getElementById('photoDrop');\n    const preview = document.getElementById('photoPreview');\n    const hint = document.getElementById('photoHint');\n    const removeBtn = document.getElementById('photoRemove');\n    const errorBox = document.getElementById('catFormError');\n    let file = null;\n    let removePhoto = false;\n\n    const close = () => api.toggleCatForm(catId);\n    document.getElementById('catCancelBtn').addEventListener('click', close);\n    document.getElementById('catCancelX').addEventListener('click', close);\n    document.getElementById('photoPick').addEventListener('click', () => fileInput.click());\n\n    function showError(message) {\n        errorBox.textContent = message;\n        errorBox.classList.remove('d-none');\n    }\n\n    function usePhoto(selected) {\n        if (!selected) return;\n        if (!selected.type.startsWith('image/')) {\n            showError('Можно загрузить только изображение.');\n            return;\n        }\n        if (selected.size > 10 * 1024 * 1024) {\n            showError('Фото больше 10 МБ.');\n            return;\n        }\n        errorBox.classList.add('d-none');\n        file = selected;\n        removePhoto = false;\n        preview.src = URL.createObjectURL(selected);\n        preview.classList.remove('d-none');\n        hint.classList.add('d-none');\n        removeBtn.classList.remove('d-none');\n    }\n\n    fileInput.addEventListener('change', () => usePhoto(fileInput.files[0]));\n\n    ['dragenter', 'dragover'].forEach((type) => drop.addEventListener(type, (event) => {\n        event.preventDefault();\n        drop.classList.add('dragover');\n    }));\n    ['dragleave', 'drop'].forEach((type) => drop.addEventListener(type, (event) => {\n        event.preventDefault();\n        drop.classList.remove('dragover');\n    }));\n    drop.addEventListener('drop', (event) => usePhoto(event.dataTransfer.files[0]));\n\n    removeBtn.addEventListener('click', () => {\n        file = null;\n        removePhoto = true;\n        fileInput.value = '';\n        preview.removeAttribute('src');\n        preview.classList.add('d-none');\n        hint.classList.remove('d-none');\n        removeBtn.classList.add('d-none');\n    });\n\n    form.addEventListener('submit', async (event) => {\n        event.preventDefault();\n        const nameInput = document.getElementById('catName');\n        const ageInput = document.getElementById('catAge');\n        const submitBtn = document.getElementById('catSubmitBtn');\n        const spinner = document.getElementById('catSpinner');\n        const icon = document.getElementById('catSubmitIcon');\n        const text = document.getElementById('catSubmitText');\n\n        errorBox.classList.add('d-none');\n        nameInput.classList.toggle('is-invalid', !nameInput.value.trim());\n        const age = ageInput.value;\n        const badAge = age !== '' && (Number(age) < 0 || Number(age) > 30 || !Number.isInteger(Number(age)));\n        ageInput.classList.toggle('is-invalid', badAge);\n        if (!nameInput.value.trim() || badAge) {\n            (badAge ? ageInput : nameInput).focus();\n            return;\n        }\n\n        submitBtn.disabled = true;\n        spinner.classList.remove('d-none');\n        icon.classList.add('d-none');\n        text.textContent = 'Сохраняем…';\n\n        try {\n            await api.saveCat(catId, {\n                cat_name: nameInput.value.trim(),\n                cat_information: document.getElementById('catInfo').value.trim(),\n                breed: document.getElementById('catBreed').value.trim(),\n                gender: form.querySelector('input[name=\"catGender\"]:checked').value,\n                age,\n            }, file, removePhoto);\n        } catch (error) {\n            showError(error.message || 'Не удалось сохранить');\n            submitBtn.disabled = false;\n            spinner.classList.add('d-none');\n            icon.classList.remove('d-none');\n            text.textContent = 'Сохранить';\n        }\n    });\n\n    document.getElementById('catName').focus();\n})();\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["_health_form.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<form class=\"health-form\" id=\"healthForm\" data-form-id=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "healthFormId"), env.opts.autoescape);
output += "\" novalidate>\n    <div class=\"d-flex align-items-center justify-content-between mb-3\">\n        <h3 class=\"h6 fw-800 mb-0\">\n            ";
if(runtime.contextOrFrameLookup(context, frame, "healthFormId") == "new") {
output += "<i class=\"bi bi-plus-circle text-primary me-1\"></i>Новая запись";
;
}
else {
output += "<i class=\"bi bi-pencil-square text-primary me-1\"></i>Изменение записи";
;
}
output += "\n        </h3>\n    </div>\n    <div class=\"row g-3\">\n        <div class=\"col-6 col-lg-3\">\n            <label for=\"healthDate\" class=\"form-label\">Дата <span class=\"text-danger\">*</span></label>\n            <input type=\"date\" class=\"form-control\" id=\"healthDate\" required value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthForm")),"date"), env.opts.autoescape);
output += "\">\n            <div class=\"invalid-feedback\">Укажите дату.</div>\n        </div>\n        <div class=\"col-6 col-lg-3\">\n            <label for=\"healthStatus\" class=\"form-label\">Состояние</label>\n            <select class=\"form-select\" id=\"healthStatus\">\n                <option value=\"healthy\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthForm")),"status") == "healthy") {
output += "selected";
;
}
output += ">Здоров</option>\n                <option value=\"observation\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthForm")),"status") == "observation") {
output += "selected";
;
}
output += ">Наблюдение</option>\n                <option value=\"sick\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthForm")),"status") == "sick") {
output += "selected";
;
}
output += ">Болен</option>\n            </select>\n        </div>\n        <div class=\"col-12 col-lg-2\">\n            <label for=\"healthWeight\" class=\"form-label\">Вес, кг</label>\n            <input type=\"number\" class=\"form-control\" id=\"healthWeight\" step=\"0.01\" min=\"0.1\" max=\"29.99\"\n                   placeholder=\"4.5\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthForm")),"weight"), env.opts.autoescape);
output += "\">\n            <div class=\"invalid-feedback\">От 0.1 до 30 кг.</div>\n        </div>\n        <div class=\"col-12 col-lg-4\">\n            <label for=\"healthNote\" class=\"form-label\">Заметка</label>\n            <input type=\"text\" class=\"form-control\" id=\"healthNote\" maxlength=\"500\"\n                   placeholder=\"Осмотр, прививка, лечение…\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthForm")),"note"), env.opts.autoescape);
output += "\">\n        </div>\n    </div>\n    <div class=\"alert alert-danger py-2 small d-none mt-3 mb-0\" id=\"healthFormError\"></div>\n    <div class=\"d-flex gap-2 mt-3\">\n        <button type=\"submit\" class=\"btn btn-primary btn-sm\" id=\"healthSubmitBtn\">\n            <span class=\"spinner-border spinner-border-sm me-1 d-none\" id=\"healthSpinner\" role=\"status\"></span>\n            <span id=\"healthSubmitText\">Сохранить</span>\n        </button>\n        <button type=\"button\" class=\"btn btn-outline-secondary btn-sm\" id=\"healthCancelBtn\">Отмена</button>\n    </div>\n</form>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["_macros.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var macro_t_1 = runtime.makeMacro(
[], 
["cls"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("cls", Object.prototype.hasOwnProperty.call(kwargs, "cls") ? kwargs["cls"] : "");var t_2 = "";t_2 += "<svg class=\"";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "cls"), env.opts.autoescape);
t_2 += "\" viewBox=\"0 0 64 64\" fill=\"currentColor\" fill-rule=\"evenodd\" aria-hidden=\"true\"><path d=\"M10 5 L23 18 Q32 15 41 18 L54 5 Q58 20 56 31 Q57 55 32 58 Q7 55 8 31 Q6 20 10 5 Z M20 33 a4 4.5 0 1 0 8 0 a4 4.5 0 1 0 -8 0 Z M36 33 a4 4.5 0 1 0 8 0 a4 4.5 0 1 0 -8 0 Z M28.5 42 L35.5 42 L32 46 Z\"/></svg>";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("cat_icon");
context.setVariable("cat_icon", macro_t_1);
output += "\n\n";
var macro_t_3 = runtime.makeMacro(
["status"], 
[], 
function (l_status, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("status", l_status);
var t_4 = "";if(l_status == "healthy") {
t_4 += "bi-heart-pulse";
;
}
else {
if(l_status == "observation") {
t_4 += "bi-eye";
;
}
else {
if(l_status == "sick") {
t_4 += "bi-bandaid";
;
}
else {
t_4 += "bi-question-circle";
;
}
;
}
;
}
;
frame = callerFrame;
return new runtime.SafeString(t_4);
});
context.addExport("status_icon");
context.setVariable("status_icon", macro_t_3);
output += "\n\n";
var macro_t_5 = runtime.makeMacro(
["status", "label"], 
[], 
function (l_status, l_label, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("status", l_status);
frame.set("label", l_label);
var t_6 = "";t_6 += "<span class=\"status-pill tone-";
t_6 += runtime.suppressValue(l_status || "none", env.opts.autoescape);
t_6 += "\"><i class=\"bi ";
t_6 += runtime.suppressValue((lineno = 4, colno = 119, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "status_icon"), "status_icon", context, [l_status])), env.opts.autoescape);
t_6 += "\"></i>";
t_6 += runtime.suppressValue(l_label || "Нет записей", env.opts.autoescape);
t_6 += "</span>";
;
frame = callerFrame;
return new runtime.SafeString(t_6);
});
context.addExport("status_pill");
context.setVariable("status_pill", macro_t_5);
output += "\n\n";
var macro_t_7 = runtime.makeMacro(
["age"], 
[], 
function (l_age, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("age", l_age);
var t_8 = "";if(l_age === 0) {
t_8 += "меньше года";
;
}
else {
if(l_age) {
t_8 += runtime.suppressValue(l_age, env.opts.autoescape);
t_8 += " ";
if(l_age % 10 == 1 && l_age % 100 != 11) {
t_8 += "год";
;
}
else {
if(l_age % 10 >= 2 && l_age % 10 <= 4 && (l_age % 100 < 10 || l_age % 100 >= 20)) {
t_8 += "года";
;
}
else {
t_8 += "лет";
;
}
;
}
;
}
else {
t_8 += "возраст не указан";
;
}
;
}
;
frame = callerFrame;
return new runtime.SafeString(t_8);
});
context.addExport("age_label");
context.setVariable("age_label", macro_t_7);
output += "\n\n";
var macro_t_9 = runtime.makeMacro(
["value"], 
[], 
function (l_value, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("value", l_value);
var t_10 = "";if(l_value) {
t_10 += runtime.suppressValue(runtime.memberLookup(((lineno = 8, colno = 54, runtime.callWrap(runtime.memberLookup((l_value),"split"), "value[\"split\"]", context, ["-"]))),2), env.opts.autoescape);
t_10 += ".";
t_10 += runtime.suppressValue(runtime.memberLookup(((lineno = 8, colno = 80, runtime.callWrap(runtime.memberLookup((l_value),"split"), "value[\"split\"]", context, ["-"]))),1), env.opts.autoescape);
t_10 += ".";
t_10 += runtime.suppressValue(runtime.memberLookup(((lineno = 8, colno = 106, runtime.callWrap(runtime.memberLookup((l_value),"split"), "value[\"split\"]", context, ["-"]))),0), env.opts.autoescape);
;
}
else {
t_10 += "—";
;
}
;
frame = callerFrame;
return new runtime.SafeString(t_10);
});
context.addExport("date_ru");
context.setVariable("date_ru", macro_t_9);
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["auth/_layout.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("_macros.html", false, "auth/_layout.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "cat_icon")) {
var t_4 = t_1.cat_icon;
} else {
cb(new Error("cannot import 'cat_icon'")); return;
}
context.setVariable("cat_icon", t_4);
output += "\n<div class=\"auth-wrap\">\n    <aside class=\"auth-side\">\n        <div class=\"d-flex align-items-center gap-2 fw-800 fs-5\">\n            <span class=\"cat-logo\">";
output += runtime.suppressValue((lineno = 4, colno = 46, runtime.callWrap(t_4, "cat_icon", context, [])), env.opts.autoescape);
output += "</span>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "appName"), env.opts.autoescape);
output += "\n        </div>\n        <div style=\"position:relative;z-index:1;\">\n            <h2 class=\"mb-3\">Каждый котик <em>под заботой</em> и присмотром</h2>\n            <p class=\"lead mb-4\">Карточки жителей кафе, история осмотров, вес и самочувствие — всё в одном месте.</p>\n            <div class=\"d-flex flex-column gap-3\">\n                <div class=\"auth-feature\"><i class=\"bi bi-grid\"></i>Каталог котиков с фото</div>\n                <div class=\"auth-feature\"><i class=\"bi bi-heart-pulse\"></i>Журнал здоровья и динамика веса</div>\n                <div class=\"auth-feature\"><i class=\"bi bi-funnel\"></i>Поиск и фильтры по состоянию</div>\n            </div>\n        </div>\n        <div class=\"small\" style=\"color:rgba(251,247,240,.5);position:relative;z-index:1;\">Котокафе · рабочее место сотрудника</div>\n        <div class=\"auth-blob\">";
output += runtime.suppressValue((lineno = 16, colno = 42, runtime.callWrap(t_4, "cat_icon", context, [])), env.opts.autoescape);
output += "</div>\n    </aside>\n    <main class=\"auth-main\">\n        <div class=\"auth-box\">\n            ";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
output += t_5;
output += "\n        </div>\n    </main>\n</div>\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("extra_js"))(env, context, frame, runtime, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
output += t_7;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 20;
var colno = 15;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_extra_js(env, context, frame, runtime, cb) {
var lineno = 25;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
b_extra_js: b_extra_js,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["auth/login.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("auth/_layout.html", true, "auth/login.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
env.getTemplate("_macros.html", false, "auth/login.html", false, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
t_4.getExported(function(t_6,t_4) {
if(t_6) { cb(t_6); return; }
if(Object.prototype.hasOwnProperty.call(t_4, "cat_icon")) {
var t_7 = t_4.cat_icon;
} else {
cb(new Error("cannot import 'cat_icon'")); return;
}
context.setVariable("cat_icon", t_7);
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
output += t_8;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_11,t_10) {
if(t_11) { cb(t_11); return; }
output += t_10;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("extra_js"))(env, context, frame, runtime, function(t_13,t_12) {
if(t_13) { cb(t_13); return; }
output += t_12;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Авторизация — ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "appName"), env.opts.autoescape);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 5;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"card border-0\">\n    <div class=\"card-body p-4 p-md-5\">\n\n        <div class=\"text-center mb-4\">\n            <div class=\"d-inline-flex align-items-center justify-content-center cat-logo cat-logo-lg mb-3\">\n                ";
output += runtime.suppressValue((lineno = 11, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "cat_icon"), "cat_icon", context, [])), env.opts.autoescape);
output += "\n            </div>\n            <h1 class=\"h3 fw-bold mb-2\">Вход в аккаунт</h1>\n            <p class=\"text-body-secondary small mb-0\">Рады видеть вас снова! Котики уже ждут.</p>\n        </div>\n\n        <div class=\"alert alert-danger d-none align-items-center gap-2 py-2 small\"\n             id=\"nonFieldAlert\" role=\"alert\">\n            <i class=\"bi bi-exclamation-triangle-fill\"></i>\n            <div id=\"nonFieldText\"></div>\n        </div>\n\n        <div class=\"alert alert-success d-none align-items-center gap-2\"\n             id=\"successAlert\" role=\"alert\">\n            <i class=\"bi bi-check-circle-fill\"></i>\n            <div>Успешный вход! Перенаправляем…</div>\n        </div>\n\n        <form id=\"loginForm\" novalidate>\n\n            <div class=\"mb-3\">\n                <label for=\"username\" class=\"form-label\">Имя пользователя</label>\n                <div class=\"input-group input-group-lg has-validation\">\n                    <span class=\"input-group-text\"><i class=\"bi bi-person\"></i></span>\n                    <input type=\"text\"\n                           class=\"form-control\"\n                           id=\"username\"\n                           name=\"username\"\n                           placeholder=\"username\"\n                           autocomplete=\"username\"\n                           required>\n                    <div class=\"invalid-feedback\" id=\"usernameError\">\n                        Введите имя пользователя.\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"mb-3\">\n                <label for=\"password\" class=\"form-label\">Пароль</label>\n                <div class=\"input-group input-group-lg has-validation\">\n                    <span class=\"input-group-text\"><i class=\"bi bi-key\"></i></span>\n                    <input type=\"password\"\n                           class=\"form-control\"\n                           id=\"password\"\n                           name=\"password\"\n                           placeholder=\"••••••••\"\n                           minlength=\"6\"\n                           autocomplete=\"current-password\"\n                           required>\n                    <button class=\"btn btn-outline-secondary\"\n                            type=\"button\"\n                            id=\"togglePassword\"\n                            aria-label=\"Показать пароль\">\n                        <i class=\"bi bi-eye\" id=\"toggleIcon\"></i>\n                    </button>\n                    <div class=\"invalid-feedback\" id=\"passwordError\">\n                        Пароль должен содержать минимум 6 символов.\n                    </div>\n                </div>\n            </div>\n\n            <button type=\"submit\" class=\"btn btn-primary btn-lg w-100 mb-3\" id=\"submitBtn\">\n                <span class=\"spinner-border spinner-border-sm me-2 d-none\"\n                      id=\"submitSpinner\" role=\"status\" aria-hidden=\"true\"></span>\n                <i class=\"bi bi-box-arrow-in-right me-1\" id=\"submitIcon\"></i>\n                <span id=\"submitText\">Войти</span>\n            </button>\n        </form>\n\n        <div class=\"text-center\">\n            <span class=\"text-body-secondary small\">Нет аккаунта?</span>\n            <a href=\"#/register\" class=\"text-decoration-none small\">Зарегистрироваться</a>\n        </div>\n\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_extra_js(env, context, frame, runtime, cb) {
var lineno = 89;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<script>\n(() => {\n    const form = document.getElementById('loginForm');\n    if (!form) return;\n\n    const username      = document.getElementById('username');\n    const password      = document.getElementById('password');\n    const usernameError = document.getElementById('usernameError');\n    const passwordError = document.getElementById('passwordError');\n\n    const toggleBtn     = document.getElementById('togglePassword');\n    const toggleIcon    = document.getElementById('toggleIcon');\n\n    const submitBtn     = document.getElementById('submitBtn');\n    const submitSpinner = document.getElementById('submitSpinner');\n    const submitIcon    = document.getElementById('submitIcon');\n    const submitText    = document.getElementById('submitText');\n\n    const successAlert  = document.getElementById('successAlert');\n    const nonFieldAlert = document.getElementById('nonFieldAlert');\n    const nonFieldText  = document.getElementById('nonFieldText');\n\n\n    toggleBtn.addEventListener('click', () => {\n        const hidden = password.type === 'password';\n        password.type = hidden ? 'text' : 'password';\n        toggleIcon.classList.toggle('bi-eye', !hidden);\n        toggleIcon.classList.toggle('bi-eye-slash', hidden);\n        toggleBtn.setAttribute('aria-label', hidden ? 'Скрыть пароль' : 'Показать пароль');\n    });\n\n\n    const validators = {\n        username() {\n            return username.value.trim() ? '' : 'Введите имя пользователя.';\n        },\n        password() {\n            if (!password.value) return 'Введите пароль.';\n            if (password.value.length < 6) return 'Пароль должен содержать минимум 6 символов.';\n            return '';\n        }\n    };\n\n    function setFieldState(input, errorEl, message) {\n        if (message) {\n            input.classList.add('is-invalid');\n            input.classList.remove('is-valid');\n            errorEl.textContent = message;\n        } else {\n            input.classList.remove('is-invalid');\n            input.classList.add('is-valid');\n        }\n    }\n\n    function validateField(name) {\n        const input   = name === 'username' ? username : password;\n        const errorEl = name === 'username' ? usernameError : passwordError;\n        const msg     = validators[name]();\n        setFieldState(input, errorEl, msg);\n        return !msg;\n    }\n\n    ['username', 'password'].forEach(name => {\n        const input = name === 'username' ? username : password;\n        input.addEventListener('blur', () => validateField(name));\n        input.addEventListener('input', () => {\n            if (input.classList.contains('is-invalid')) validateField(name);\n        });\n    });\n\n    function showError(msg) {\n        nonFieldText.textContent = msg;\n        nonFieldAlert.classList.remove('d-none');\n        nonFieldAlert.classList.add('d-flex');\n    }\n\n\n    form.addEventListener('submit', async (e) => {\n        e.preventDefault();\n\n        nonFieldAlert.classList.add('d-none');\n        nonFieldAlert.classList.remove('d-flex');\n\n        const okUser = validateField('username');\n        const okPass = validateField('password');\n        if (!okUser || !okPass) {\n            (!okUser ? username : password).focus();\n            return;\n        }\n\n        submitBtn.disabled = true;\n        submitIcon.classList.add('d-none');\n        submitSpinner.classList.remove('d-none');\n        submitText.textContent = 'Проверяем…';\n\n        try {\n            await window.taskflowAuth.login(username.value.trim(), password.value);\n            successAlert.classList.remove('d-none');\n            successAlert.classList.add('d-flex');\n            setTimeout(() => window.navigate('/'), 400);\n        } catch (error) {\n            showError(error.message || 'Не удалось войти');\n            submitBtn.disabled = false;\n            submitSpinner.classList.add('d-none');\n            submitIcon.classList.remove('d-none');\n            submitText.textContent = 'Войти';\n        }\n    });\n})();\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
b_extra_js: b_extra_js,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["auth/reg.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("auth/_layout.html", true, "auth/reg.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
env.getTemplate("_macros.html", false, "auth/reg.html", false, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
t_4.getExported(function(t_6,t_4) {
if(t_6) { cb(t_6); return; }
if(Object.prototype.hasOwnProperty.call(t_4, "cat_icon")) {
var t_7 = t_4.cat_icon;
} else {
cb(new Error("cannot import 'cat_icon'")); return;
}
context.setVariable("cat_icon", t_7);
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
output += t_8;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_11,t_10) {
if(t_11) { cb(t_11); return; }
output += t_10;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("extra_js"))(env, context, frame, runtime, function(t_13,t_12) {
if(t_13) { cb(t_13); return; }
output += t_12;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Регистрация — ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "appName"), env.opts.autoescape);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 5;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"card border-0\">\n    <div class=\"card-body p-4 p-md-5\">\n\n        <div class=\"text-center mb-4\">\n            <div class=\"d-inline-flex align-items-center justify-content-center cat-logo cat-logo-lg mb-3\">\n                ";
output += runtime.suppressValue((lineno = 11, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "cat_icon"), "cat_icon", context, [])), env.opts.autoescape);
output += "\n            </div>\n            <h1 class=\"h3 fw-bold mb-2\">Создать аккаунт</h1>\n            <p class=\"text-body-secondary small mb-0\">Регистрация сотрудника кафе</p>\n        </div>\n\n        <div class=\"alert alert-success d-none align-items-center gap-2\"\n             id=\"successAlert\" role=\"alert\">\n            <i class=\"bi bi-check-circle-fill\"></i>\n            <div>Аккаунт создан! Перенаправляем…</div>\n        </div>\n\n        <div class=\"alert alert-danger d-none align-items-center gap-2 py-2 small\"\n             id=\"nonFieldAlert\" role=\"alert\">\n            <i class=\"bi bi-exclamation-triangle-fill\"></i>\n            <div id=\"nonFieldText\"></div>\n        </div>\n\n        <form id=\"registerForm\" novalidate>\n\n            <div class=\"mb-3\">\n                <label for=\"username\" class=\"form-label\">Имя пользователя</label>\n                <div class=\"input-group input-group-lg has-validation\">\n                    <span class=\"input-group-text\"><i class=\"bi bi-person\"></i></span>\n                    <input type=\"text\"\n                           class=\"form-control\"\n                           id=\"username\"\n                           name=\"username\"\n                           placeholder=\"username\"\n                           minlength=\"3\"\n                           maxlength=\"150\"\n                           required>\n                    <div class=\"invalid-feedback\" id=\"nameError\">\n                        Введите имя пользователя (минимум 3 символа).\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"mb-3\">\n                <label for=\"email\" class=\"form-label\">Email</label>\n                <div class=\"input-group input-group-lg has-validation\">\n                    <span class=\"input-group-text\"><i class=\"bi bi-envelope\"></i></span>\n                    <input type=\"email\"\n                           class=\"form-control\"\n                           id=\"email\"\n                           name=\"email\"\n                           placeholder=\"name@example.com\">\n                    <div class=\"invalid-feedback\" id=\"emailError\">\n                        Введите корректный email.\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"row g-3 mb-3\">\n                <div class=\"col-12 col-sm-6\">\n                    <label for=\"firstName\" class=\"form-label\">Имя</label>\n                    <input type=\"text\" class=\"form-control\" id=\"firstName\"\n                           name=\"first_name\" placeholder=\"Анна\" maxlength=\"150\">\n                </div>\n                <div class=\"col-12 col-sm-6\">\n                    <label for=\"lastName\" class=\"form-label\">Фамилия</label>\n                    <input type=\"text\" class=\"form-control\" id=\"lastName\"\n                           name=\"last_name\" placeholder=\"Иванова\" maxlength=\"150\">\n                </div>\n            </div>\n\n            <div class=\"mb-3\">\n                <label for=\"password\" class=\"form-label\">Пароль</label>\n                <div class=\"input-group input-group-lg has-validation\">\n                    <span class=\"input-group-text\"><i class=\"bi bi-key\"></i></span>\n                    <input type=\"password\"\n                           class=\"form-control\"\n                           id=\"password\"\n                           name=\"password1\"\n                           placeholder=\"••••••••\"\n                           minlength=\"8\"\n                           required>\n                    <button class=\"btn btn-outline-secondary\"\n                            type=\"button\"\n                            id=\"togglePassword\"\n                            aria-label=\"Показать пароль\">\n                        <i class=\"bi bi-eye\" id=\"toggleIcon\"></i>\n                    </button>\n                    <div class=\"invalid-feedback\" id=\"passwordError\">\n                        Пароль должен содержать минимум 8 символов.\n                    </div>\n                </div>\n\n                <div class=\"progress mt-2\" style=\"height:6px;\" role=\"progressbar\"\n                     aria-label=\"Надёжность пароля\" aria-valuemin=\"0\" aria-valuemax=\"4\" aria-valuenow=\"0\">\n                    <div class=\"progress-bar\" id=\"strengthBar\" style=\"width:0%\"></div>\n                </div>\n                <div class=\"form-text\" id=\"strengthText\">Минимум 8 символов, буквы и цифры</div>\n            </div>\n\n            <div class=\"mb-3\">\n                <label for=\"password2\" class=\"form-label\">Подтвердите пароль</label>\n                <div class=\"input-group input-group-lg has-validation\">\n                    <span class=\"input-group-text\"><i class=\"bi bi-shield-check\"></i></span>\n                    <input type=\"password\"\n                           class=\"form-control\"\n                           id=\"password2\"\n                           name=\"password2\"\n                           placeholder=\"••••••••\"\n                           required>\n                    <button class=\"btn btn-outline-secondary\"\n                            type=\"button\"\n                            id=\"togglePassword2\"\n                            aria-label=\"Показать пароль\">\n                        <i class=\"bi bi-eye\" id=\"toggleIcon2\"></i>\n                    </button>\n                    <div class=\"invalid-feedback\" id=\"password2Error\">\n                        Пароли не совпадают.\n                    </div>\n                </div>\n            </div>\n\n            <button type=\"submit\" class=\"btn btn-primary btn-lg w-100 mb-3\" id=\"submitBtn\">\n                <span class=\"spinner-border spinner-border-sm me-2 d-none\"\n                      id=\"submitSpinner\" role=\"status\" aria-hidden=\"true\"></span>\n                <i class=\"bi bi-person-plus me-1\" id=\"submitIcon\"></i>\n                <span id=\"submitText\">Зарегистрироваться</span>\n            </button>\n        </form>\n\n        <div class=\"text-center\">\n            <span class=\"text-body-secondary small\">Уже есть аккаунт?</span>\n            <a href=\"#/login\" class=\"text-decoration-none small\">Войти</a>\n        </div>\n\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_extra_js(env, context, frame, runtime, cb) {
var lineno = 145;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<script>\n(() => {\n    const form = document.getElementById('registerForm');\n    if (!form) return;\n\n    const nonFieldAlert = document.getElementById('nonFieldAlert');\n    const nonFieldText  = document.getElementById('nonFieldText');\n\n    function showNonField(msg) {\n        nonFieldText.textContent = msg;\n        nonFieldAlert.classList.remove('d-none');\n        nonFieldAlert.classList.add('d-flex');\n    }\n\n    const fields = {\n        username:  document.getElementById('username'),\n        email:     document.getElementById('email'),\n        password:  document.getElementById('password'),\n        password2: document.getElementById('password2'),\n    };\n\n    const errors = {\n        username:  document.getElementById('nameError'),\n        email:     document.getElementById('emailError'),\n        password:  document.getElementById('passwordError'),\n        password2: document.getElementById('password2Error'),\n    };\n\n    const strengthBar  = document.getElementById('strengthBar');\n    const strengthText = document.getElementById('strengthText');\n\n    const submitBtn     = document.getElementById('submitBtn');\n    const submitSpinner = document.getElementById('submitSpinner');\n    const submitIcon    = document.getElementById('submitIcon');\n    const submitText    = document.getElementById('submitText');\n    const successAlert  = document.getElementById('successAlert');\n\n\n    function setupToggle(btnId, iconId, input) {\n        const btn  = document.getElementById(btnId);\n        const icon = document.getElementById(iconId);\n        btn.addEventListener('click', () => {\n            const hidden = input.type === 'password';\n            input.type = hidden ? 'text' : 'password';\n            icon.classList.toggle('bi-eye', !hidden);\n            icon.classList.toggle('bi-eye-slash', hidden);\n            btn.setAttribute('aria-label', hidden ? 'Скрыть пароль' : 'Показать пароль');\n        });\n    }\n    setupToggle('togglePassword',  'toggleIcon',  fields.password);\n    setupToggle('togglePassword2', 'toggleIcon2', fields.password2);\n\n\n    const validators = {\n        username() {\n            const v = fields.username.value.trim();\n            if (!v) return 'Введите имя пользователя.';\n            if (v.length < 3) return 'Минимум 3 символа.';\n            if (!/^[\\w.@+-]+$/.test(v)) return 'Только буквы, цифры и @/./+/-/_.';\n            return '';\n        },\n        email() {\n            const v = fields.email.value.trim();\n            if (!v) return 'Введите email.';\n            if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)) return 'Введите корректный email.';\n            return '';\n        },\n        password() {\n            const v = fields.password.value;\n            if (!v) return 'Введите пароль.';\n            if (v.length < 8) return 'Минимум 8 символов.';\n            if (!/[a-zA-Zа-яА-Я]/.test(v) || !/\\d/.test(v)) return 'Пароль должен содержать буквы и цифры.';\n            return '';\n        },\n        password2() {\n            const v = fields.password2.value;\n            if (!v) return 'Подтвердите пароль.';\n            if (v !== fields.password.value) return 'Пароли не совпадают.';\n            return '';\n        }\n    };\n\n    function setFieldState(name, message) {\n        const input   = fields[name];\n        const errorEl = errors[name];\n        if (message) {\n            input.classList.add('is-invalid');\n            input.classList.remove('is-valid');\n            if (errorEl) errorEl.textContent = message;\n        } else {\n            input.classList.remove('is-invalid');\n            input.classList.add('is-valid');\n        }\n    }\n\n    function validateField(name) {\n        const msg = validators[name]();\n        setFieldState(name, msg);\n        return !msg;\n    }\n\n\n    function calcStrength(pwd) {\n        let score = 0;\n        if (pwd.length >= 8) score++;\n        if (pwd.length >= 12) score++;\n        if (/[a-z]/.test(pwd) && /[A-ZА-Я]/.test(pwd)) score++;\n        if (/\\d/.test(pwd)) score++;\n        if (/[^A-Za-zА-Яа-я0-9]/.test(pwd)) score++;\n        return Math.min(score, 4);\n    }\n\n    function updateStrength() {\n        const pwd = fields.password.value;\n        const score = calcStrength(pwd);\n        const colors = ['bg-danger', 'bg-danger', 'bg-warning', 'bg-info', 'bg-success'];\n        const labels = ['Очень слабый', 'Слабый', 'Средний', 'Хороший', 'Надёжный'];\n        const widths = [0, 25, 50, 75, 100];\n\n        strengthBar.className = 'progress-bar ' + colors[score];\n        strengthBar.style.width = widths[score] + '%';\n        strengthText.textContent = pwd\n            ? 'Надёжность: ' + labels[score]\n            : 'Минимум 8 символов, буквы и цифры';\n    }\n\n\n    ['username', 'email', 'password', 'password2'].forEach(name => {\n        const input = fields[name];\n        input.addEventListener('blur', () => validateField(name));\n        input.addEventListener('input', () => {\n            if (input.classList.contains('is-invalid')) validateField(name);\n        });\n    });\n\n    fields.password.addEventListener('input', () => {\n        updateStrength();\n        if (fields.password2.value) validateField('password2');\n    });\n\n\n    form.addEventListener('submit', async (e) => {\n        e.preventDefault();\n        nonFieldAlert.classList.add('d-none');\n        nonFieldAlert.classList.remove('d-flex');\n\n        const names = ['username', 'email', 'password', 'password2'];\n        const results = names.map(validateField);\n        const firstInvalid = names.find((n, i) => !results[i]);\n\n        if (firstInvalid) {\n            fields[firstInvalid].focus();\n            return;\n        }\n\n        submitBtn.disabled = true;\n        submitIcon.classList.add('d-none');\n        submitSpinner.classList.remove('d-none');\n        submitText.textContent = 'Создаём аккаунт…';\n\n        try {\n            await window.taskflowAuth.register({\n                username: fields.username.value.trim(),\n                email: fields.email.value.trim(),\n                first_name: document.getElementById('firstName').value.trim(),\n                last_name: document.getElementById('lastName').value.trim(),\n                password: fields.password.value,\n                password2: fields.password2.value,\n            });\n            successAlert.classList.remove('d-none');\n            successAlert.classList.add('d-flex');\n            setTimeout(() => window.navigate('/'), 500);\n        } catch (error) {\n            showNonField(error.message || 'Не удалось зарегистрироваться');\n            submitBtn.disabled = false;\n            submitSpinner.classList.add('d-none');\n            submitIcon.classList.remove('d-none');\n            submitText.textContent = 'Зарегистрироваться';\n        }\n    });\n})();\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
b_extra_js: b_extra_js,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["base.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("_macros.html", false, "base.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "cat_icon")) {
var t_4 = t_1.cat_icon;
} else {
cb(new Error("cannot import 'cat_icon'")); return;
}
context.setVariable("cat_icon", t_4);
output += "\n";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("navbar.html", false, "base.html", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
callback(null,t_5);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
callback(null,t_7);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n<main class=\"container-xl py-4 px-4\">\n    ";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_10,t_9) {
if(t_10) { cb(t_10); return; }
output += t_9;
output += "\n</main>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 7;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["cat_detail.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "cat_detail.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
env.getTemplate("_macros.html", false, "cat_detail.html", false, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
t_4.getExported(function(t_6,t_4) {
if(t_6) { cb(t_6); return; }
if(Object.prototype.hasOwnProperty.call(t_4, "cat_icon")) {
var t_7 = t_4.cat_icon;
} else {
cb(new Error("cannot import 'cat_icon'")); return;
}
context.setVariable("cat_icon", t_7);
if(Object.prototype.hasOwnProperty.call(t_4, "status_icon")) {
var t_8 = t_4.status_icon;
} else {
cb(new Error("cannot import 'status_icon'")); return;
}
context.setVariable("status_icon", t_8);
if(Object.prototype.hasOwnProperty.call(t_4, "status_pill")) {
var t_9 = t_4.status_pill;
} else {
cb(new Error("cannot import 'status_pill'")); return;
}
context.setVariable("status_pill", t_9);
if(Object.prototype.hasOwnProperty.call(t_4, "age_label")) {
var t_10 = t_4.age_label;
} else {
cb(new Error("cannot import 'age_label'")); return;
}
context.setVariable("age_label", t_10);
if(Object.prototype.hasOwnProperty.call(t_4, "date_ru")) {
var t_11 = t_4.date_ru;
} else {
cb(new Error("cannot import 'date_ru'")); return;
}
context.setVariable("date_ru", t_11);
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_13,t_12) {
if(t_13) { cb(t_13); return; }
output += t_12;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<span id=\"catIdSource\" class=\"d-none\" data-cat-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "params")),"id"), env.opts.autoescape);
output += "\"></span>\n\n<div class=\"d-flex align-items-center gap-3 mb-4\">\n    <button type=\"button\" class=\"btn btn-outline-secondary btn-icon\" id=\"backBtn\" aria-label=\"Назад к списку\"\n            data-bs-toggle=\"tooltip\" title=\"Ко всем котикам\">\n        <i class=\"bi bi-arrow-left\"></i>\n    </button>\n    <div class=\"flex-grow-1 min-w-0\">\n        <div class=\"text-body-secondary small\"><a href=\"#/cats\" class=\"text-reset text-decoration-none\">Котики</a> / карточка</div>\n        <div class=\"d-flex align-items-center gap-3 flex-wrap\">\n            <h1 class=\"h2 fw-800 mb-0 text-truncate\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"cat_name"), env.opts.autoescape);
output += "</h1>\n            ";
output += runtime.suppressValue((lineno = 15, colno = 26, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "status_pill"), "status_pill", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"last_status"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"last_status_display")])), env.opts.autoescape);
output += "\n        </div>\n    </div>\n    <div class=\"d-flex gap-2\">\n        <button type=\"button\" class=\"btn btn-outline-primary\" id=\"editCatBtn\">\n            <i class=\"bi bi-pencil me-1\"></i>Изменить\n        </button>\n        <button type=\"button\" class=\"btn btn-outline-danger\" id=\"deleteCatBtn\" data-name=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"cat_name"), env.opts.autoescape);
output += "\">\n            <i class=\"bi bi-trash3 me-1\"></i>Удалить\n        </button>\n    </div>\n</div>\n\n";
if(runtime.contextOrFrameLookup(context, frame, "loadError")) {
output += "\n<div class=\"alert alert-danger d-flex align-items-center gap-2 rounded-4\" role=\"alert\">\n    <i class=\"bi bi-exclamation-triangle-fill\"></i>\n    <div class=\"flex-grow-1\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "loadError"), env.opts.autoescape);
output += "</div>\n    <button type=\"button\" class=\"btn btn-sm btn-outline-danger\" id=\"retryBtn\">Повторить</button>\n</div>\n";
;
}
output += "\n\n";
if(runtime.contextOrFrameLookup(context, frame, "showCatForm") && runtime.contextOrFrameLookup(context, frame, "catFormId")) {
output += "\n";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("_cat_form.html", false, "cat_detail.html", false, function(t_15,t_14) {
if(t_15) { cb(t_15); return; }
callback(null,t_14);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_17,t_16) {
if(t_17) { cb(t_17); return; }
callback(null,t_16);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n";
});
}
output += "\n\n<div class=\"row g-4\">\n    <div class=\"col-12 col-lg-4\">\n        <div class=\"cat-panel p-3\">\n            <div class=\"cat-photo cat-photo-lg tone-";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"id") % 6, env.opts.autoescape);
output += " ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"photo_credit")) {
output += "mb-2";
;
}
else {
output += "mb-3";
;
}
output += "\">\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"photo")) {
output += "\n                <img src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"photo"), env.opts.autoescape);
output += "\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"cat_name"), env.opts.autoescape);
output += "\">\n                ";
;
}
else {
output += "\n                ";
output += runtime.suppressValue((lineno = 47, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "cat_icon"), "cat_icon", context, ["cat-silhouette"])), env.opts.autoescape);
output += "\n                ";
;
}
output += "\n            </div>\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"photo_credit")) {
output += "\n            <div class=\"photo-credit mb-3\"><i class=\"bi bi-camera me-1\"></i>Фото: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"photo_credit"), env.opts.autoescape);
output += "</div>\n            ";
;
}
output += "\n            <div class=\"info-grid mb-3\">\n                <div class=\"info-item\">\n                    <div class=\"label\">Порода</div>\n                    <div class=\"value text-truncate\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"breed") || "—", env.opts.autoescape);
output += "</div>\n                </div>\n                <div class=\"info-item\">\n                    <div class=\"label\">Пол</div>\n                    <div class=\"value\">\n                        <i class=\"bi ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"gender") == "female") {
output += "bi-gender-female";
;
}
else {
output += "bi-gender-male";
;
}
output += " text-primary me-1\"></i>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"gender_display"), env.opts.autoescape);
output += "\n                    </div>\n                </div>\n                <div class=\"info-item\">\n                    <div class=\"label\">Возраст</div>\n                    <div class=\"value\">";
output += runtime.suppressValue((lineno = 66, colno = 51, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "age_label"), "age_label", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"age")])), env.opts.autoescape);
output += "</div>\n                </div>\n                <div class=\"info-item\">\n                    <div class=\"label\">Вес</div>\n                    <div class=\"value\">";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"last_weight")) {
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"last_weight"), env.opts.autoescape);
output += " кг";
;
}
else {
output += "—";
;
}
output += "</div>\n                </div>\n            </div>\n            <div class=\"px-1\">\n                <div class=\"text-body-secondary small fw-bold text-uppercase mb-1\">О котике</div>\n                <p class=\"mb-1\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"cat_information") || "Описание пока не добавлено", env.opts.autoescape);
output += "</p>\n            </div>\n        </div>\n\n        ";
if(runtime.contextOrFrameLookup(context, frame, "weightChart")) {
output += "\n        <div class=\"cat-panel p-3 mt-4\">\n            <div class=\"d-flex justify-content-between align-items-center mb-2\">\n                <div class=\"text-body-secondary small fw-bold text-uppercase\"><i class=\"bi bi-graph-up me-1\"></i>Динамика веса</div>\n                <span class=\"status-pill ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "weightChart")),"delta") < 0) {
output += "tone-observation";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "weightChart")),"delta") > 0) {
output += "tone-healthy";
;
}
else {
output += "tone-none";
;
}
;
}
output += "\">\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "weightChart")),"delta") > 0) {
output += "+";
;
}
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "weightChart")),"delta"), env.opts.autoescape);
output += " кг\n                </span>\n            </div>\n            <svg viewBox=\"0 0 ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "weightChart")),"width"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "weightChart")),"height"), env.opts.autoescape);
output += "\" class=\"w-100\" style=\"height:110px;\" preserveAspectRatio=\"none\" role=\"img\" aria-label=\"График веса\">\n                <polygon points=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "weightChart")),"area"), env.opts.autoescape);
output += "\" fill=\"rgba(217,119,87,.12)\"></polygon>\n                <polyline points=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "weightChart")),"line"), env.opts.autoescape);
output += "\" fill=\"none\" stroke=\"#D97757\" stroke-width=\"2.5\" stroke-linejoin=\"round\" stroke-linecap=\"round\" vector-effect=\"non-scaling-stroke\"></polyline>\n                ";
frame = frame.push();
var t_20 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "weightChart")),"dots");
if(t_20) {t_20 = runtime.fromIterator(t_20);
var t_19 = t_20.length;
for(var t_18=0; t_18 < t_20.length; t_18++) {
var t_21 = t_20[t_18];
frame.set("dot", t_21);
frame.set("loop.index", t_18 + 1);
frame.set("loop.index0", t_18);
frame.set("loop.revindex", t_19 - t_18);
frame.set("loop.revindex0", t_19 - t_18 - 1);
frame.set("loop.first", t_18 === 0);
frame.set("loop.last", t_18 === t_19 - 1);
frame.set("loop.length", t_19);
output += "\n                <circle cx=\"";
output += runtime.suppressValue(runtime.memberLookup((t_21),"x"), env.opts.autoescape);
output += "\" cy=\"";
output += runtime.suppressValue(runtime.memberLookup((t_21),"y"), env.opts.autoescape);
output += "\" r=\"3.5\" fill=\"#fff\" stroke=\"#D97757\" stroke-width=\"2\" vector-effect=\"non-scaling-stroke\"><title>";
output += runtime.suppressValue((lineno = 91, colno = 164, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "date_ru"), "date_ru", context, [runtime.memberLookup((t_21),"date")])), env.opts.autoescape);
output += ": ";
output += runtime.suppressValue(runtime.memberLookup((t_21),"weight"), env.opts.autoescape);
output += " кг</title></circle>\n                ";
;
}
}
frame = frame.pop();
output += "\n            </svg>\n            <div class=\"d-flex justify-content-between small text-body-secondary\">\n                <span>мин. ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "weightChart")),"min"), env.opts.autoescape);
output += " кг</span>\n                <span>макс. ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "weightChart")),"max"), env.opts.autoescape);
output += " кг</span>\n            </div>\n        </div>\n        ";
;
}
output += "\n    </div>\n\n    <div class=\"col-12 col-lg-8\">\n        <div class=\"cat-panel p-4\">\n            <div class=\"d-flex align-items-center justify-content-between gap-2 mb-3\">\n                <div>\n                    <h2 class=\"h5 fw-800 mb-0\"><i class=\"bi bi-clipboard2-pulse text-primary me-2\"></i>Сведения о здоровье</h2>\n                    <div class=\"text-body-secondary small\">Записей: ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "health")), env.opts.autoescape);
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"health_count") != env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "health"))) {
output += " из ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cat")),"health_count"), env.opts.autoescape);
;
}
output += "</div>\n                </div>\n                <button type=\"button\" class=\"btn btn-primary\" id=\"addHealthBtn\">\n                    <i class=\"bi bi-plus-lg me-1\"></i>Добавить запись\n                </button>\n            </div>\n\n            <form class=\"row g-2 mb-4\" id=\"healthFilterForm\">\n                <div class=\"col-12 col-md-4\">\n                    <select class=\"form-select form-select-sm\" id=\"healthStatusFilter\" aria-label=\"Состояние\">\n                        <option value=\"\">Любое состояние</option>\n                        <option value=\"healthy\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthFilters")),"status") == "healthy") {
output += "selected";
;
}
output += ">Здоров</option>\n                        <option value=\"observation\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthFilters")),"status") == "observation") {
output += "selected";
;
}
output += ">Наблюдение</option>\n                        <option value=\"sick\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthFilters")),"status") == "sick") {
output += "selected";
;
}
output += ">Болен</option>\n                    </select>\n                </div>\n                <div class=\"col-5 col-md-3\">\n                    <input type=\"date\" class=\"form-control form-control-sm\" id=\"healthDateFrom\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthFilters")),"date_from"), env.opts.autoescape);
output += "\"\n                           aria-label=\"С даты\" data-bs-toggle=\"tooltip\" title=\"С даты\">\n                </div>\n                <div class=\"col-5 col-md-3\">\n                    <input type=\"date\" class=\"form-control form-control-sm\" id=\"healthDateTo\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthFilters")),"date_to"), env.opts.autoescape);
output += "\"\n                           aria-label=\"По дату\" data-bs-toggle=\"tooltip\" title=\"По дату\">\n                </div>\n                <div class=\"col-2 col-md-2 d-grid\">\n                    <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" id=\"healthFilterReset\" aria-label=\"Сбросить фильтр\">\n                        <i class=\"bi bi-arrow-counterclockwise\"></i>\n                    </button>\n                </div>\n            </form>\n\n            ";
if(runtime.contextOrFrameLookup(context, frame, "healthFormId") == "new") {
output += "\n            <div class=\"mb-4\">";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("_health_form.html", false, "cat_detail.html", false, function(t_23,t_22) {
if(t_23) { cb(t_23); return; }
callback(null,t_22);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_25,t_24) {
if(t_25) { cb(t_25); return; }
callback(null,t_24);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "</div>\n            ";
});
}
output += "\n\n            ";
if(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "health"))) {
output += "\n            <ul class=\"health-timeline\">\n                ";
frame = frame.push();
var t_28 = runtime.contextOrFrameLookup(context, frame, "health");
if(t_28) {t_28 = runtime.fromIterator(t_28);
var t_27 = t_28.length;
for(var t_26=0; t_26 < t_28.length; t_26++) {
var t_29 = t_28[t_26];
frame.set("record", t_29);
frame.set("loop.index", t_26 + 1);
frame.set("loop.index0", t_26);
frame.set("loop.revindex", t_27 - t_26);
frame.set("loop.revindex0", t_27 - t_26 - 1);
frame.set("loop.first", t_26 === 0);
frame.set("loop.last", t_26 === t_27 - 1);
frame.set("loop.length", t_27);
output += "\n                <li class=\"health-item ";
if(runtime.contextOrFrameLookup(context, frame, "healthFormId") == runtime.memberLookup((t_29),"id")) {
output += "editing";
;
}
output += "\">\n                    <span class=\"marker tone-";
output += runtime.suppressValue(runtime.memberLookup((t_29),"status"), env.opts.autoescape);
output += "\"><i class=\"bi ";
output += runtime.suppressValue((lineno = 146, colno = 93, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "status_icon"), "status_icon", context, [runtime.memberLookup((t_29),"status")])), env.opts.autoescape);
output += "\"></i></span>\n                    <div class=\"content\">\n                        ";
if(runtime.contextOrFrameLookup(context, frame, "healthFormId") == runtime.memberLookup((t_29),"id")) {
output += "\n                        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("_health_form.html", false, "cat_detail.html", false, function(t_31,t_30) {
if(t_31) { cb(t_31); return; }
callback(null,t_30);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_33,t_32) {
if(t_33) { cb(t_33); return; }
callback(null,t_32);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n                        ";
});
}
else {
output += "\n                        <div class=\"d-flex align-items-start justify-content-between gap-2\">\n                            <div class=\"min-w-0\">\n                                <div class=\"d-flex align-items-center gap-2 flex-wrap mb-1\">\n                                    <span class=\"fw-800\">";
output += runtime.suppressValue((lineno = 154, colno = 67, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "date_ru"), "date_ru", context, [runtime.memberLookup((t_29),"date")])), env.opts.autoescape);
output += "</span>\n                                    ";
output += runtime.suppressValue((lineno = 155, colno = 50, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "status_pill"), "status_pill", context, [runtime.memberLookup((t_29),"status"),runtime.memberLookup((t_29),"status_display")])), env.opts.autoescape);
output += "\n                                    ";
if(runtime.memberLookup((t_29),"weight")) {
output += "<span class=\"small text-body-secondary\"><i class=\"bi bi-speedometer2 me-1\"></i>";
output += runtime.suppressValue(runtime.memberLookup((t_29),"weight"), env.opts.autoescape);
output += " кг</span>";
;
}
output += "\n                                </div>\n                                <div class=\"small ";
if(!runtime.memberLookup((t_29),"note")) {
output += "text-body-secondary fst-italic";
;
}
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_29),"note") || "Без заметки", env.opts.autoescape);
output += "</div>\n                            </div>\n                            <div class=\"d-flex gap-1 flex-shrink-0\">\n                                <button type=\"button\" class=\"btn btn-sm btn-outline-secondary btn-icon border-0\" data-health-edit=\"";
output += runtime.suppressValue(runtime.memberLookup((t_29),"id"), env.opts.autoescape);
output += "\"\n                                        aria-label=\"Изменить\" data-bs-toggle=\"tooltip\" title=\"Изменить\">\n                                    <i class=\"bi bi-pencil\"></i>\n                                </button>\n                                <button type=\"button\" class=\"btn btn-sm btn-outline-danger btn-icon border-0\" data-health-delete=\"";
output += runtime.suppressValue(runtime.memberLookup((t_29),"id"), env.opts.autoescape);
output += "\"\n                                        data-date=\"";
output += runtime.suppressValue((lineno = 166, colno = 61, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "date_ru"), "date_ru", context, [runtime.memberLookup((t_29),"date")])), env.opts.autoescape);
output += "\" aria-label=\"Удалить\" data-bs-toggle=\"tooltip\" title=\"Удалить\">\n                                    <i class=\"bi bi-trash3\"></i>\n                                </button>\n                            </div>\n                        </div>\n                        ";
;
}
output += "\n                    </div>\n                </li>\n                ";
;
}
}
frame = frame.pop();
output += "\n            </ul>\n            ";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "healthFormId") != "new") {
output += "\n            <div class=\"empty-state py-4\">\n                ";
output += runtime.suppressValue((lineno = 178, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "cat_icon"), "cat_icon", context, [])), env.opts.autoescape);
output += "\n                <p class=\"mb-3\">";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthFilters")),"status") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthFilters")),"date_from") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "healthFilters")),"date_to")) {
output += "Нет записей по выбранным условиям";
;
}
else {
output += "Записей о здоровье пока нет";
;
}
output += "</p>\n            </div>\n            ";
;
}
;
}
output += "\n        </div>\n    </div>\n</div>\n\n<script>\n(() => {\n    const source = document.getElementById('catIdSource');\n    if (!source) return;\n\n    const api = window.taskflowCats;\n    const catId = source.dataset.catId;\n\n    document.getElementById('backBtn').addEventListener('click', () => api.backToCats());\n    document.getElementById('retryBtn')?.addEventListener('click', () => api.reload());\n    document.getElementById('editCatBtn').addEventListener('click', () => {\n        api.toggleCatForm(catId);\n        window.scrollTo({ top: 0, behavior: 'smooth' });\n    });\n\n    const deleteBtn = document.getElementById('deleteCatBtn');\n    deleteBtn.addEventListener('click', async () => {\n        const ok = await window.ui.confirm(`Котик «${deleteBtn.dataset.name}» и вся история его здоровья будут удалены.`);\n        if (!ok) return;\n        try {\n            await api.removeCat(catId);\n        } catch (error) {\n            window.ui.toast(error.message || 'Не удалось удалить', 'danger');\n        }\n    });\n\n    document.getElementById('healthStatusFilter').addEventListener('change', (e) => api.setHealthFilter('status', e.target.value));\n    document.getElementById('healthDateFrom').addEventListener('change', (e) => api.setHealthFilter('date_from', e.target.value));\n    document.getElementById('healthDateTo').addEventListener('change', (e) => api.setHealthFilter('date_to', e.target.value));\n    document.getElementById('healthFilterReset').addEventListener('click', () => api.resetHealthFilters());\n\n    document.getElementById('addHealthBtn').addEventListener('click', () => api.toggleHealthForm(null));\n\n    document.querySelectorAll('[data-health-edit]').forEach((button) => {\n        button.addEventListener('click', () => api.toggleHealthForm(button.dataset.healthEdit));\n    });\n\n    document.querySelectorAll('[data-health-delete]').forEach((button) => {\n        button.addEventListener('click', async () => {\n            const ok = await window.ui.confirm(`Запись о здоровье от ${button.dataset.date} будет удалена.`);\n            if (!ok) return;\n            try {\n                await api.removeHealth(button.dataset.healthDelete);\n            } catch (error) {\n                window.ui.toast(error.message || 'Не удалось удалить', 'danger');\n            }\n        });\n    });\n\n    const healthForm = document.getElementById('healthForm');\n    if (!healthForm) return;\n\n    document.getElementById('healthCancelBtn').addEventListener('click', () => api.closeHealthForm());\n    healthForm.scrollIntoView({ block: 'nearest', behavior: 'smooth' });\n\n    healthForm.addEventListener('submit', async (event) => {\n        event.preventDefault();\n        const dateInput = document.getElementById('healthDate');\n        const weightInput = document.getElementById('healthWeight');\n        const errorBox = document.getElementById('healthFormError');\n        const submitBtn = document.getElementById('healthSubmitBtn');\n        const spinner = document.getElementById('healthSpinner');\n        const text = document.getElementById('healthSubmitText');\n\n        errorBox.classList.add('d-none');\n        const weight = weightInput.value;\n        const badWeight = weight !== '' && !(Number(weight) > 0 && Number(weight) < 30);\n        dateInput.classList.toggle('is-invalid', !dateInput.value);\n        weightInput.classList.toggle('is-invalid', badWeight);\n        if (!dateInput.value || badWeight) return;\n\n        submitBtn.disabled = true;\n        spinner.classList.remove('d-none');\n        text.textContent = 'Сохраняем…';\n\n        try {\n            await api.saveHealth(catId, healthForm.dataset.formId, {\n                date: dateInput.value,\n                status: document.getElementById('healthStatus').value,\n                weight,\n                note: document.getElementById('healthNote').value.trim(),\n            });\n        } catch (error) {\n            errorBox.textContent = error.message || 'Не удалось сохранить';\n            errorBox.classList.remove('d-none');\n            submitBtn.disabled = false;\n            spinner.classList.add('d-none');\n            text.textContent = 'Сохранить';\n        }\n    });\n})();\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["cats.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "cats.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
env.getTemplate("_macros.html", false, "cats.html", false, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
t_4.getExported(function(t_6,t_4) {
if(t_6) { cb(t_6); return; }
if(Object.prototype.hasOwnProperty.call(t_4, "cat_icon")) {
var t_7 = t_4.cat_icon;
} else {
cb(new Error("cannot import 'cat_icon'")); return;
}
context.setVariable("cat_icon", t_7);
if(Object.prototype.hasOwnProperty.call(t_4, "status_icon")) {
var t_8 = t_4.status_icon;
} else {
cb(new Error("cannot import 'status_icon'")); return;
}
context.setVariable("status_icon", t_8);
if(Object.prototype.hasOwnProperty.call(t_4, "age_label")) {
var t_9 = t_4.age_label;
} else {
cb(new Error("cannot import 'age_label'")); return;
}
context.setVariable("age_label", t_9);
if(Object.prototype.hasOwnProperty.call(t_4, "date_ru")) {
var t_10 = t_4.date_ru;
} else {
cb(new Error("cannot import 'date_ru'")); return;
}
context.setVariable("date_ru", t_10);
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_12,t_11) {
if(t_12) { cb(t_12); return; }
output += t_11;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"page-head d-flex align-items-end justify-content-between gap-3 mb-4\">\n    <div>\n        <span class=\"page-tag mb-2\"><i class=\"bi bi-cup-hot\"></i>Кошачье кафе</span>\n        <h1 class=\"h2 mb-1\">Наши котики</h1>\n        <div class=\"text-body-secondary\">Показано ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "cats")), env.opts.autoescape);
output += " из ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"total") || 0, env.opts.autoescape);
output += "</div>\n    </div>\n    <button type=\"button\" class=\"btn btn-primary btn-lg\" id=\"addCatBtn\">\n        <i class=\"bi bi-plus-lg me-1\"></i>Добавить котика\n    </button>\n</div>\n\n";
if(runtime.contextOrFrameLookup(context, frame, "loadError")) {
output += "\n<div class=\"alert alert-danger d-flex align-items-center gap-2 rounded-4\" role=\"alert\">\n    <i class=\"bi bi-exclamation-triangle-fill\"></i>\n    <div class=\"flex-grow-1\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "loadError"), env.opts.autoescape);
output += "</div>\n    <button type=\"button\" class=\"btn btn-sm btn-outline-danger\" id=\"retryBtn\">Повторить</button>\n</div>\n";
;
}
output += "\n\n";
if(runtime.contextOrFrameLookup(context, frame, "showCatForm") && !runtime.contextOrFrameLookup(context, frame, "catFormId")) {
output += "\n";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("_cat_form.html", false, "cats.html", false, function(t_14,t_13) {
if(t_14) { cb(t_14); return; }
callback(null,t_13);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_16,t_15) {
if(t_16) { cb(t_16); return; }
callback(null,t_15);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n";
});
}
output += "\n\n<div class=\"row g-3 mb-4\">\n    ";
var t_17;
t_17 = [["","Все котики",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"total"),"bi-grid","all"],["healthy","Здоровы",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"healthy"),"bi-heart-pulse","healthy"],["observation","Под наблюдением",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"observation"),"bi-eye","observation"],["sick","Болеют",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"sick"),"bi-bandaid","sick"],["none","Без записей",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"none"),"bi-question-circle","none"]];
frame.set("chips", t_17, true);
if(frame.topLevel) {
context.setVariable("chips", t_17);
}
if(frame.topLevel) {
context.addExport("chips", t_17);
}
output += "\n    ";
frame = frame.push();
var t_20 = runtime.contextOrFrameLookup(context, frame, "chips");
if(t_20) {t_20 = runtime.fromIterator(t_20);
var t_19 = t_20.length;
for(var t_18=0; t_18 < t_20.length; t_18++) {
var t_21 = t_20[t_18];
frame.set("chip", t_21);
frame.set("loop.index", t_18 + 1);
frame.set("loop.index0", t_18);
frame.set("loop.revindex", t_19 - t_18);
frame.set("loop.revindex0", t_19 - t_18 - 1);
frame.set("loop.first", t_18 === 0);
frame.set("loop.last", t_18 === t_19 - 1);
frame.set("loop.length", t_19);
output += "\n    <div class=\"col\">\n        <button type=\"button\" class=\"stat-chip ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"status") == runtime.memberLookup((t_21),0)) {
output += "active";
;
}
output += "\" data-status-chip=\"";
output += runtime.suppressValue(runtime.memberLookup((t_21),0), env.opts.autoescape);
output += "\">\n            <span class=\"stat-icon tone-";
output += runtime.suppressValue(runtime.memberLookup((t_21),4), env.opts.autoescape);
output += "\"><i class=\"bi ";
output += runtime.suppressValue(runtime.memberLookup((t_21),3), env.opts.autoescape);
output += "\"></i></span>\n            <span>\n                <span class=\"stat-value d-block\">";
output += runtime.suppressValue(runtime.memberLookup((t_21),2) || 0, env.opts.autoescape);
output += "</span>\n                <span class=\"stat-label\">";
output += runtime.suppressValue(runtime.memberLookup((t_21),1), env.opts.autoescape);
output += "</span>\n            </span>\n        </button>\n    </div>\n    ";
;
}
}
frame = frame.pop();
output += "\n</div>\n\n<div class=\"cat-panel p-3 mb-4\">\n    <form id=\"searchForm\" class=\"row g-2 align-items-center\" autocomplete=\"off\">\n        <div class=\"col-12 col-lg-4\">\n            <div class=\"input-group\">\n                <span class=\"input-group-text\"><i class=\"bi bi-search\"></i></span>\n                <input type=\"search\" class=\"form-control\" id=\"searchInput\"\n                       placeholder=\"Кличка, порода или описание\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"name"), env.opts.autoescape);
output += "\">\n            </div>\n        </div>\n        <div class=\"col-6 col-lg-2\">\n            <select class=\"form-select\" id=\"genderFilter\" aria-label=\"Пол\">\n                <option value=\"\">Любой пол</option>\n                <option value=\"male\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"gender") == "male") {
output += "selected";
;
}
output += ">Коты</option>\n                <option value=\"female\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"gender") == "female") {
output += "selected";
;
}
output += ">Кошки</option>\n            </select>\n        </div>\n        <div class=\"col-6 col-lg-2\">\n            <select class=\"form-select\" id=\"breedFilter\" aria-label=\"Порода\">\n                <option value=\"\">Все породы</option>\n                ";
frame = frame.push();
var t_24 = runtime.contextOrFrameLookup(context, frame, "breeds");
if(t_24) {t_24 = runtime.fromIterator(t_24);
var t_23 = t_24.length;
for(var t_22=0; t_22 < t_24.length; t_22++) {
var t_25 = t_24[t_22];
frame.set("breed", t_25);
frame.set("loop.index", t_22 + 1);
frame.set("loop.index0", t_22);
frame.set("loop.revindex", t_23 - t_22);
frame.set("loop.revindex0", t_23 - t_22 - 1);
frame.set("loop.first", t_22 === 0);
frame.set("loop.last", t_22 === t_23 - 1);
frame.set("loop.length", t_23);
output += "\n                <option value=\"";
output += runtime.suppressValue(t_25, env.opts.autoescape);
output += "\" ";
if(env.getFilter("lower").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"breed")) == env.getFilter("lower").call(context, t_25)) {
output += "selected";
;
}
output += ">";
output += runtime.suppressValue(t_25, env.opts.autoescape);
output += "</option>\n                ";
;
}
}
frame = frame.pop();
output += "\n            </select>\n        </div>\n        <div class=\"col-8 col-lg-3\">\n            <div class=\"input-group\">\n                <span class=\"input-group-text\"><i class=\"bi bi-sort-down\"></i></span>\n                <select class=\"form-select\" id=\"sortSelect\" aria-label=\"Сортировка\">\n                    <option value=\"name\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"sort") == "name") {
output += "selected";
;
}
output += ">По кличке</option>\n                    <option value=\"age\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"sort") == "age") {
output += "selected";
;
}
output += ">Сначала младшие</option>\n                    <option value=\"-age\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"sort") == "-age") {
output += "selected";
;
}
output += ">Сначала старшие</option>\n                    <option value=\"last_date\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"sort") == "last_date") {
output += "selected";
;
}
output += ">Недавний осмотр</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"col-4 col-lg-1 d-grid\">\n            <button type=\"button\" class=\"btn btn-outline-secondary\" id=\"resetFilter\"\n                    data-bs-toggle=\"tooltip\" title=\"Сбросить фильтры\" aria-label=\"Сбросить фильтры\">\n                <i class=\"bi bi-arrow-counterclockwise\"></i>\n            </button>\n        </div>\n    </form>\n</div>\n\n";
if(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "cats"))) {
output += "\n<div class=\"row g-4\">\n    ";
frame = frame.push();
var t_28 = runtime.contextOrFrameLookup(context, frame, "cats");
if(t_28) {t_28 = runtime.fromIterator(t_28);
var t_27 = t_28.length;
for(var t_26=0; t_26 < t_28.length; t_26++) {
var t_29 = t_28[t_26];
frame.set("cat", t_29);
frame.set("loop.index", t_26 + 1);
frame.set("loop.index0", t_26);
frame.set("loop.revindex", t_27 - t_26);
frame.set("loop.revindex0", t_27 - t_26 - 1);
frame.set("loop.first", t_26 === 0);
frame.set("loop.last", t_26 === t_27 - 1);
frame.set("loop.length", t_27);
output += "\n    <div class=\"col-12 col-md-6 col-xl-4\">\n        <article class=\"cat-card\" tabindex=\"0\" data-open-cat=\"";
output += runtime.suppressValue(runtime.memberLookup((t_29),"id"), env.opts.autoescape);
output += "\" aria-label=\"Открыть карточку ";
output += runtime.suppressValue(runtime.memberLookup((t_29),"cat_name"), env.opts.autoescape);
output += "\">\n            <div class=\"cat-photo tone-";
output += runtime.suppressValue(runtime.memberLookup((t_29),"id") % 6, env.opts.autoescape);
output += "\">\n                ";
if(runtime.memberLookup((t_29),"photo")) {
output += "\n                <img src=\"";
output += runtime.suppressValue(runtime.memberLookup((t_29),"photo"), env.opts.autoescape);
output += "\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((t_29),"cat_name"), env.opts.autoescape);
output += "\" loading=\"lazy\" ";
if(runtime.memberLookup((t_29),"photo_credit")) {
output += "title=\"Фото: ";
output += runtime.suppressValue(runtime.memberLookup((t_29),"photo_credit"), env.opts.autoescape);
output += "\"";
;
}
output += ">\n                ";
;
}
else {
output += "\n                ";
output += runtime.suppressValue((lineno = 101, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "cat_icon"), "cat_icon", context, ["cat-silhouette"])), env.opts.autoescape);
output += "\n                ";
;
}
output += "\n                <span class=\"status-pill on-photo\">\n                    <span class=\"dot dot-";
output += runtime.suppressValue(runtime.memberLookup((t_29),"last_status") || "none", env.opts.autoescape);
output += "\"></span>";
output += runtime.suppressValue(runtime.memberLookup((t_29),"last_status_display") || "Нет записей", env.opts.autoescape);
output += "\n                </span>\n            </div>\n            <div class=\"cat-card-body\">\n                <div class=\"d-flex align-items-center justify-content-between gap-2 mb-1\">\n                    <h2 class=\"cat-name text-truncate\">";
output += runtime.suppressValue(runtime.memberLookup((t_29),"cat_name"), env.opts.autoescape);
output += "</h2>\n                    <i class=\"bi ";
if(runtime.memberLookup((t_29),"gender") == "female") {
output += "bi-gender-female";
;
}
else {
output += "bi-gender-male";
;
}
output += " text-body-secondary\"\n                       title=\"";
output += runtime.suppressValue(runtime.memberLookup((t_29),"gender_display"), env.opts.autoescape);
output += "\"></i>\n                </div>\n                <div class=\"cat-meta mb-2\">";
output += runtime.suppressValue(runtime.memberLookup((t_29),"breed") || "Порода не указана", env.opts.autoescape);
output += " · ";
output += runtime.suppressValue((lineno = 113, colno = 96, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "age_label"), "age_label", context, [runtime.memberLookup((t_29),"age")])), env.opts.autoescape);
output += "</div>\n                <p class=\"cat-desc mb-3\">";
output += runtime.suppressValue(runtime.memberLookup((t_29),"cat_information") || "Описание пока не добавлено", env.opts.autoescape);
output += "</p>\n                <div class=\"cat-card-footer\">\n                    <span>\n                        <i class=\"bi bi-calendar-event me-1\"></i>\n                        ";
if(runtime.memberLookup((t_29),"last_date")) {
output += "Осмотр ";
output += runtime.suppressValue((lineno = 118, colno = 63, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "date_ru"), "date_ru", context, [runtime.memberLookup((t_29),"last_date")])), env.opts.autoescape);
;
}
else {
output += "Осмотров не было";
;
}
output += "\n                        ";
if(runtime.memberLookup((t_29),"last_weight")) {
output += " · ";
output += runtime.suppressValue(runtime.memberLookup((t_29),"last_weight"), env.opts.autoescape);
output += " кг";
;
}
output += "\n                    </span>\n                    <span class=\"go\"><i class=\"bi bi-arrow-right\"></i></span>\n                </div>\n            </div>\n        </article>\n    </div>\n    ";
;
}
}
frame = frame.pop();
output += "\n    <div class=\"col-12 col-md-6 col-xl-4\">\n        <button type=\"button\" class=\"cat-add-card w-100\" id=\"addCatCard\">\n            <i class=\"bi bi-plus-circle-dotted\"></i>\n            Новый котик\n        </button>\n    </div>\n</div>\n";
;
}
else {
if(!runtime.contextOrFrameLookup(context, frame, "loadError")) {
output += "\n<div class=\"cat-panel empty-state\">\n    ";
output += runtime.suppressValue((lineno = 136, colno = 15, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "cat_icon"), "cat_icon", context, [])), env.opts.autoescape);
output += "\n    <h2 class=\"h5 fw-800 text-body\">Котики не найдены</h2>\n    <p class=\"mb-3\">Попробуйте изменить поиск или сбросить фильтры.</p>\n    <button type=\"button\" class=\"btn btn-outline-primary\" id=\"emptyReset\">Сбросить фильтры</button>\n</div>\n";
;
}
;
}
output += "\n\n<script>\n(() => {\n    const searchForm = document.getElementById('searchForm');\n    if (!searchForm) return;\n\n    const api = window.taskflowCats;\n    const searchInput = document.getElementById('searchInput');\n    let timer = 0;\n\n    searchForm.addEventListener('submit', (event) => {\n        event.preventDefault();\n        clearTimeout(timer);\n        api.setFilter('name', searchInput.value);\n    });\n    searchInput.addEventListener('input', () => {\n        clearTimeout(timer);\n        timer = setTimeout(() => api.setFilter('name', searchInput.value), 350);\n    });\n    if (api.takeSearchFocus()) {\n        searchInput.focus();\n        searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);\n    }\n\n    document.getElementById('genderFilter').addEventListener('change', (e) => api.setFilter('gender', e.target.value));\n    document.getElementById('breedFilter').addEventListener('change', (e) => api.setFilter('breed', e.target.value));\n    document.getElementById('sortSelect').addEventListener('change', (e) => api.setFilter('sort', e.target.value));\n    document.getElementById('resetFilter').addEventListener('click', () => api.resetFilters());\n    document.getElementById('emptyReset')?.addEventListener('click', () => api.resetFilters());\n    document.getElementById('retryBtn')?.addEventListener('click', () => api.reload());\n\n    document.querySelectorAll('[data-status-chip]').forEach((chip) => {\n        chip.addEventListener('click', () => api.setFilter('status', chip.dataset.statusChip));\n    });\n\n    document.querySelectorAll('[data-open-cat]').forEach((card) => {\n        card.addEventListener('click', () => api.openCat(card.dataset.openCat));\n        card.addEventListener('keydown', (event) => {\n            if (event.key === 'Enter') api.openCat(card.dataset.openCat);\n        });\n    });\n\n    const openForm = () => {\n        api.toggleCatForm(null);\n        window.scrollTo({ top: 0, behavior: 'smooth' });\n    };\n    document.getElementById('addCatBtn').addEventListener('click', openForm);\n    document.getElementById('addCatCard')?.addEventListener('click', openForm);\n})();\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["home.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "home.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"cat-panel p-4\">\n    <h1 class=\"h3 mb-1\">Привет, ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"first_name") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"username"), env.opts.autoescape);
output += "</h1>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["navbar.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("_macros.html", false, "navbar.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "cat_icon")) {
var t_4 = t_1.cat_icon;
} else {
cb(new Error("cannot import 'cat_icon'")); return;
}
context.setVariable("cat_icon", t_4);
output += "\n<nav class=\"navbar navbar-expand app-navbar sticky-top py-2\">\n    <div class=\"container-xl px-4\">\n        <a class=\"navbar-brand d-flex align-items-center gap-2 fw-800 me-4\" href=\"#/\">\n            <span class=\"cat-logo\">";
output += runtime.suppressValue((lineno = 4, colno = 46, runtime.callWrap(t_4, "cat_icon", context, [])), env.opts.autoescape);
output += "</span>\n            <span class=\"d-flex flex-column lh-1\">\n                <span>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "appName"), env.opts.autoescape);
output += "</span>\n                <small class=\"text-body-secondary fw-semibold\" style=\"font-size:.7rem;\">учёт котиков и здоровья</small>\n            </span>\n        </a>\n\n        <ul class=\"navbar-nav gap-1 me-auto\">\n            <li class=\"nav-item\">\n                <a class=\"nav-link ";
if(runtime.contextOrFrameLookup(context, frame, "route") == "/" || runtime.contextOrFrameLookup(context, frame, "route") == "/cats") {
output += "active";
;
}
output += "\" href=\"#/cats\">\n                    <i class=\"bi bi-grid me-1\"></i>Котики\n                </a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link ";
if(runtime.contextOrFrameLookup(context, frame, "route") == "/profile") {
output += "active";
;
}
output += "\" href=\"#/profile\">\n                    <i class=\"bi bi-person-badge me-1\"></i>Профиль\n                </a>\n            </li>\n        </ul>\n\n        <div class=\"d-flex align-items-center gap-2\">\n            <button type=\"button\" class=\"btn btn-outline-secondary btn-icon border-0\" id=\"themeToggle\"\n                    aria-label=\"Переключить тему\" data-bs-toggle=\"tooltip\" data-bs-placement=\"bottom\" title=\"Светлая / тёмная тема\">\n                <i class=\"bi bi-moon-stars\" id=\"themeIcon\"></i>\n            </button>\n\n            <div class=\"dropdown\">\n                <button class=\"btn p-0 border-0 d-flex align-items-center gap-2\" type=\"button\"\n                        data-bs-toggle=\"dropdown\" aria-expanded=\"false\" aria-label=\"Меню профиля\">\n                    <span class=\"avatar-circle\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"initial"), env.opts.autoescape);
output += "</span>\n                    <span class=\"d-none d-lg-inline fw-semibold small\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"display_name"), env.opts.autoescape);
output += "</span>\n                    <i class=\"bi bi-chevron-down small text-body-secondary\"></i>\n                </button>\n                <ul class=\"dropdown-menu dropdown-menu-end shadow p-2 mt-2\" style=\"width:240px;\">\n                    <li class=\"px-3 py-2\">\n                        <div class=\"fw-bold text-truncate\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"display_name"), env.opts.autoescape);
output += "</div>\n                        <div class=\"text-body-secondary small text-truncate\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"email") || "email не указан", env.opts.autoescape);
output += "</div>\n                    </li>\n                    <li><hr class=\"dropdown-divider\"></li>\n                    <li>\n                        <a class=\"dropdown-item rounded-3\" href=\"#/profile\"><i class=\"bi bi-person me-2\"></i>Профиль</a>\n                    </li>\n                    <li>\n                        <a class=\"dropdown-item rounded-3 text-danger\" href=\"#/login\" data-logout>\n                            <i class=\"bi bi-box-arrow-right me-2\"></i>Выйти\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</nav>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["profile.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "profile.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"mx-auto\" style=\"max-width:960px;\">\n    <div class=\"page-head mb-4\">\n        <span class=\"page-tag mb-2\"><i class=\"bi bi-person-badge\"></i>Сотрудник кафе</span>\n        <h1 class=\"h2 mb-0\">Профиль</h1>\n    </div>\n\n    <div class=\"cat-panel p-4 mb-4\">\n        <div class=\"d-flex flex-column flex-sm-row align-items-center gap-4\">\n            <span class=\"avatar-circle avatar-xl mt-2\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"initials"), env.opts.autoescape);
output += "</span>\n            <div class=\"flex-grow-1 text-center text-sm-start\">\n                <h2 class=\"h3 fw-800 mb-1\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"display_name"), env.opts.autoescape);
output += "</h2>\n                <div class=\"text-body-secondary mb-2\">@";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"username"), env.opts.autoescape);
output += "</div>\n                <span class=\"status-pill tone-all\"><i class=\"bi bi-calendar3\"></i>В команде с ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"date_joined_label") || "—", env.opts.autoescape);
output += "</span>\n            </div>\n            <div class=\"d-flex gap-2\">\n                ";
if(!runtime.contextOrFrameLookup(context, frame, "editProfile")) {
output += "\n                <button type=\"button\" class=\"btn btn-outline-primary\" id=\"editProfileBtn\">\n                    <i class=\"bi bi-pencil me-1\"></i>Редактировать\n                </button>\n                ";
;
}
output += "\n                <button type=\"button\" class=\"btn btn-outline-danger\" data-logout>\n                    <i class=\"bi bi-box-arrow-right me-1\"></i>Выйти\n                </button>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"cat-panel p-4\">\n        <h2 class=\"h6 text-body-secondary text-uppercase fw-bold mb-3\">Основная информация</h2>\n        ";
if(runtime.contextOrFrameLookup(context, frame, "editProfile")) {
output += "\n        <form id=\"profileForm\" novalidate>\n            <div class=\"row g-3\">\n                <div class=\"col-12 col-md-6\">\n                    <label for=\"pFirst\" class=\"form-label\">Имя</label>\n                    <input type=\"text\" class=\"form-control\" id=\"pFirst\" maxlength=\"150\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"first_name"), env.opts.autoescape);
output += "\">\n                </div>\n                <div class=\"col-12 col-md-6\">\n                    <label for=\"pLast\" class=\"form-label\">Фамилия</label>\n                    <input type=\"text\" class=\"form-control\" id=\"pLast\" maxlength=\"150\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"last_name"), env.opts.autoescape);
output += "\">\n                </div>\n                <div class=\"col-12\">\n                    <label for=\"pEmail\" class=\"form-label\">Email</label>\n                    <input type=\"email\" class=\"form-control\" id=\"pEmail\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"email"), env.opts.autoescape);
output += "\">\n                    <div class=\"invalid-feedback\">Введите корректный email.</div>\n                </div>\n            </div>\n            <div class=\"alert alert-danger py-2 small d-none mt-3 mb-0\" id=\"profileError\"></div>\n            <div class=\"d-flex gap-2 mt-4\">\n                <button type=\"submit\" class=\"btn btn-primary\" id=\"profileSave\"><i class=\"bi bi-check-lg me-1\"></i>Сохранить</button>\n                <button type=\"button\" class=\"btn btn-outline-secondary\" id=\"profileCancel\">Отмена</button>\n            </div>\n        </form>\n        ";
;
}
else {
output += "\n        <div class=\"info-grid\">\n            <div class=\"info-item\">\n                <div class=\"label\">Имя пользователя</div>\n                <div class=\"value\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"username") || "—", env.opts.autoescape);
output += "</div>\n            </div>\n            <div class=\"info-item\">\n                <div class=\"label\">Email</div>\n                <div class=\"value text-truncate\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"email") || "—", env.opts.autoescape);
output += "</div>\n            </div>\n            <div class=\"info-item\">\n                <div class=\"label\">Имя</div>\n                <div class=\"value\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"first_name") || "—", env.opts.autoescape);
output += "</div>\n            </div>\n            <div class=\"info-item\">\n                <div class=\"label\">Фамилия</div>\n                <div class=\"value\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"last_name") || "—", env.opts.autoescape);
output += "</div>\n            </div>\n        </div>\n        ";
;
}
output += "\n    </div>\n</div>\n\n<script>\n(() => {\n    const auth = window.taskflowAuth;\n    document.getElementById('editProfileBtn')?.addEventListener('click', () => auth.toggleEditProfile());\n\n    const form = document.getElementById('profileForm');\n    if (!form) return;\n\n    document.getElementById('profileCancel').addEventListener('click', () => auth.toggleEditProfile());\n    form.addEventListener('submit', async (event) => {\n        event.preventDefault();\n        const email = document.getElementById('pEmail');\n        const errorBox = document.getElementById('profileError');\n        const bad = email.value.trim() && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value.trim());\n        email.classList.toggle('is-invalid', Boolean(bad));\n        if (bad) return;\n        const button = document.getElementById('profileSave');\n        button.disabled = true;\n        try {\n            await auth.saveProfile({\n                first_name: document.getElementById('pFirst').value.trim(),\n                last_name: document.getElementById('pLast').value.trim(),\n                email: email.value.trim(),\n            });\n            window.ui.toast('Профиль обновлён', 'success');\n        } catch (error) {\n            errorBox.textContent = error.message || 'Не удалось сохранить';\n            errorBox.classList.remove('d-none');\n            button.disabled = false;\n        }\n    });\n})();\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();



  var env = null;

  function getEnv() {
    if (env) return env;
    env = new nunjucks.Environment(new nunjucks.PrecompiledLoader(window.nunjucksPrecompiled), { autoescape: true });
    return env;
  }

  global.renderPage = function (name, context) {
    return getEnv().render(name, context || {});
  };
})(window);
