// Validation of arguments for simplified context structure

import { SimplifiedAssistantContext } from "./createEmptyAssistantContext";

interface UpdateContextArgs {
  project_goal?: string;
  project_type?: string;
  target_audience?: string;
  industry?: string;
  key_features?: string[];
  recommended_services?: string[];
  deadline?: string;
  budget_range?: string;
  platform?: string;
  integrations?: string[];
  contact_name?: string;
  contact_info?: string;
}

export function validateUpdateContextArgs(
  args: any
): args is UpdateContextArgs {
  // Если аргументы пустые или null/undefined - это валидно (пустой вызов)
  if (!args || typeof args !== "object") {
    console.log(
      "📝 Validation: Empty or invalid args object, treating as valid empty update"
    );
    return true;
  }

  // Проверяем, что нет неизвестных полей
  const validFields = [
    "project_goal",
    "project_type",
    "target_audience",
    "industry",
    "key_features",
    "recommended_services",
    "deadline",
    "budget_range",
    "platform",
    "integrations",
    "contact_name",
    "contact_info",
  ];

  const providedFields = Object.keys(args);
  const invalidFields = providedFields.filter(
    (field) => !validFields.includes(field)
  );

  if (invalidFields.length > 0) {
    console.warn("⚠️ Validation: Invalid fields found:", invalidFields);
    return false;
  }

  // Проверяем типы полей
  const validationChecks = [
    // Строковые поля
    ...[
      "project_goal",
      "project_type",
      "target_audience",
      "industry",
      "deadline",
      "budget_range",
      "platform",
      "contact_name",
      "contact_info",
    ].map((field) => ({
      field,
      isValid: !args[field] || typeof args[field] === "string",
    })),

    // Массивы строк
    ...["key_features", "recommended_services", "integrations"].map(
      (field) => ({
        field,
        isValid:
          !args[field] ||
          (Array.isArray(args[field]) &&
            args[field].every((item: any) => typeof item === "string")),
      })
    ),
  ];

  const failedChecks = validationChecks.filter((check) => !check.isValid);

  if (failedChecks.length > 0) {
    console.warn(
      "⚠️ Validation: Type validation failed for fields:",
      failedChecks.map((check) => check.field)
    );
    return false;
  }

  // Validation passed successfully
  console.log("✅ Validation: Args are valid", {
    fieldsProvided: providedFields.length,
    fields: providedFields,
  });

  return true;
}
